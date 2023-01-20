const shell = require("shelljs");
const request = require("request");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs-extra");

/**
 * Perform a node request but wrapped in a Promise.
 */
function requestAsync(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.error("Could not retrieve the requested URL.", url);
        process.exit(1);
      } else {
        resolve(body);
      }
    });
  });
}

/**
 * To open up gitlab merge request, we need to fetch the project ID. The project
 * ID is available on the body of the page loaded for the repo.
 */
async function openGitlabPR(repoUrl, releaseVersion) {
  // Indicates if browser closing was supposed to happen or not
  let shouldExit = false;

  // Make our browser with a profile directory so we can reuse the login
  let browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.resolve(__dirname, "../../node_modules/.cache/pr-ticket"),
    defaultViewport: null
  });

  // Watch for browser disconnects
  browser.on('disconnected', () => {
    console.log("Browser was closed or crashed.");

    if (!shouldExit) {
      console.warn("Browser was closed or crashed. Try the command again.");
    }

    process.exit(1);
  });

  let page = await browser.newPage();

  console.warn("Opening project url...");
  await page.goto(repoUrl);

  // The project ID is located on the body within attribute
  // data-project-id="722"
  let projectId = await page.evaluate(() => {
    return document.body.getAttribute("data-project-id");
  });

  // If we could not get a project ID, present a non-headless browser to allow
  // the user to login.
  if (!projectId) {
    console.warn("No project id found, login might be needed...");
    await page.goto(repoUrl);

    while (!projectId) {
      const fn = 'document?.body?.getAttribute("data-project-id")';
      await page.waitForFunction(fn, { timeout: 0 });
      projectId = await page.evaluate(fn);
    }
  }

  if (!projectId) {
    console.warn("Could not log in or find project id. Rerun the command or debug the issue.");
    process.exit(1);
  }

  console.warn("Project ID found:", projectId, "\nOpening merge request...");
  console.log("Launching Repo PRs");

  const makePR = async (source, target, includeUtf) => {
    console.log("Creating PR", source, target);

    // Use the proper URL structure to generate the page with the correct merge request
    await page.goto(`${
        repoUrl
      }/-/merge_requests/new?${
        includeUtf ? "utf8=%E2%9C%93&" : ""
      }merge_request%5Bsource_project_id%5D=${
        projectId
      }&merge_request%5Bsource_branch%5D=${
        encodeURIComponent(source)
      }&merge_request%5Btarget_project_id%5D=${
        projectId
      }&merge_request%5Btarget_branch%5D=${
        target
      }`
    );

    // Wait for the elements to be available to manipulate
    await page.waitForFunction(() => {
      const node = document.querySelector("#merge_request_title");
      return node !== null && node !== void 0;
    }, { timeout: 0 });

    // Populate the elements with expected configuration
    await page.evaluate((releaseVersion) => {
      document.querySelector("#merge_request_title").value = `Release ${releaseVersion}`;
      document.querySelector("#merge_request_description").value = `Release ${releaseVersion}`;
      document.querySelector("#merge_request_force_remove_source_branch").checked = false;
    }, releaseVersion);

    // Wait for the page to close
    await new Promise(r => {
      page.on('close', async () => {
        page = await browser.newPage();
        r();
        console.warn("Gitlab ticket process finished\n\n");
      });
    })
  }

  // Wait for both PRs to come to completion
  console.warn("\n\nWaiting for browser windows to be closed...\n\n");
  await makePR("release", "dev");
  await makePR("release", "main");

  // Close after all pages closed
  shouldExit = true;
  browser.close();
}

async function openGitPR(repoUrl, releaseVersion, showLogIn) {
  let shouldExit = false;
  let browser = await puppeteer.launch({
    // If showLogIn, then we must present the browser so the user can enter
    // their credentials.
    headless: false,
    userDataDir: path.resolve(__dirname, "../../node_modules/.cache/pr-ticket"),
    defaultViewport: null
  });

  // Watch for browser disconnects
  browser.on('disconnected', () => {
    console.log("Browser was closed or crashed.");

    if (!shouldExit) {
      console.warn("Browser was closed or crashed. Try the command again.");
    }

    process.exit(1);
  });

  let page = await browser.newPage();
  console.warn("Opening project url: ", repoUrl);
  await page.goto(repoUrl);

  // The project ID is located on the body within attribute
  // data-project-id="722"
  console.warn("Checking for logged-in attribute on body...")
  const loggedIn = await page.evaluate(() => {
    console.log("logged-in check:", document?.body?.getAttribute("class").split(" ").find(c => c.startsWith("logged-in")));
    return document?.body?.getAttribute("class").split(" ").find(c => c.startsWith("logged-in"));
  });

  console.warn("Loggin in check:", loggedIn);

  // If no login detected, then we need to allow the user to log into their
  // github account.
  if (!loggedIn) {
    console.warn("User login required...");
    const loginUrl = "https://github.com/login";
    console.warn("Opening github login page: ", loginUrl)
    await page.goto(loginUrl);
    const fn = 'document?.body?.getAttribute("class").split(" ").find(c => c.startsWith("logged-in"))';

    while (!loggedIn) {
      await page.waitForFunction(fn, { timeout: 0 });
      loggedIn = await page.evaluate(fn);
    }
  }

  const makePR = async (source, target) => {
    console.log("Creating PR", source, target);

    // https://github.com/Diniden/simple-data-provider/compare/master...release
    // Use the proper URL structure to generate the page with the correct merge request
    await page.goto(`${
        repoUrl
      }/compare/${
        target
      }...${
        source
      }`
    );

    // Wait for the elements to be available to manipulate
    await page.waitForFunction(() => {
      const node = document.querySelector('#repo-content-pjax-container > div > div.js-details-container.Details.js-compare-pr > div > button');
      node?.click();
      return node !== null && node !== void 0;
    });

    // Populate the elements with expected configuration
    await page.evaluate(async (releaseVersion) => {
      document.querySelector('[name="pull_request[title]"]').value = `Release ${releaseVersion}`;
      document.querySelector('[name="pull_request[body]"]').value = `Release ${releaseVersion}`;
    }, releaseVersion);

    // Wait for the page to close
    await new Promise(r => {
      page.on('close', async () => {
        page = await browser.newPage();
        r();
        console.warn("Github ticket process finished\n\n");
      });
    })
  }

  // Wait for both PRs to come to completion
  console.warn("\n\nWaiting for browser windows to be closed...\n\n");
  await makePR("release", "dev"),
  await makePR("release", "master"),

  // Close after all pages closed
  browser.close();
}

/**
 * This command is intended to work with the current branch IF the branch has
 * been created using the "npm run ticket" command.
 *
 * This will look into the current branch and find the commit that contains the
 * ticket branch name and ticket URL. This will generate a commit and merge
 * request that contains the ticket that is linked.
 */
async function run(repoUrl, repoType) {
  // Validate we have implemented a strategy for a given repo type.
  const validRepos = new Set(["gitlab", "git", "github"]);

  if (!validRepos.has(repoType)) {
    console.error(`Unsupported repo type: ${repoType}`);
    process.exit(1);
  }

  // We can only do this operation if there is nothing to commit or push
  // This only works if no changes are present
  if (shell.exec("git status --porcelain=v1 2>/dev/null | wc -l | grep 0", { silent: true }).code !== 0) {
    console.error("You have uncommitted changes or the current state of the project can not be determined. Please commit or stash them before continuing.");
    process.exit(1);
  }

  // Get the current project version from the package.json file
  const packageJson = fs.readJsonSync(path.resolve(__dirname, "../../package.json"));
  const version = packageJson.version;

  // Now we open the url to the new merge request
  switch (repoType) {
    case "gitlab":
      await openGitlabPR(repoUrl, version);
      break;

    case "git":
    case "github":
      await openGitPR(repoUrl, version);
      break;

    default:
      console.warn("No supported repo type found");
  }
}

module.exports = run;
