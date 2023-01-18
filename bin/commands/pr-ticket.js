const viewTicket = require("./view-ticket");
const shell = require("shelljs");
const request = require("request");
const puppeteer = require("puppeteer");
const path = require("path");
const releaseNotes = require('./release-notes');
const { AutoComplete } = require('enquirer');

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
async function openGitlabPR(repoUrl, sourceBranch, ticketURL, showLogIn) {
  let browser = await puppeteer.launch({
    // If showLogIn, then we must present the browser so the user can enter
    // their credentials.
    headless: !showLogIn,
    userDataDir: path.resolve(__dirname, "../../node_modules/.cache/pr-ticket"),
    defaultViewport: null
  });

  let page = await browser.newPage();

  if (showLogIn) {
    console.warn("User login required...");
    let shouldExit = true;

    browser.on('disconnected', () => {
      if (!shouldExit) return;
      console.warn("Browser was closed or crashed. Try the command again.");
      process.exit(1);
    });

    await page.goto(repoUrl);
    await page.waitForFunction(() => {
      const projectId = document?.body?.getAttribute("data-project-id");
      return projectId !== null && projectId !== void 0;
    }, { timeout: 0 });

    shouldExit = false;
  }

  else {
    console.warn("Opening project url...");
    await page.goto(repoUrl);
  }

  // The project ID is located on the body within attribute
  // data-project-id="722"
  const projectId = await page.evaluate(() => {
    return document.body.getAttribute("data-project-id");
  });

  // IF we attempted a login AND there is no project ID available, then we are
  // unable to determine the project ID.
  if (!projectId && showLogIn) {
    await browser.close();
    console.error("Failed to retrieve project ID for the repository.");
    process.exit(1);
  }

  // If we could not get a project ID, present a non-headless browser to allow
  // the user to login.
  else if (!projectId) {
    console.warn("No project id found, login might be needed...");
    await browser.close();
    openGitlabPR(repoUrl, sourceBranch, ticketURL, true);
    return;
  }

  console.warn("Project ID found:", projectId, "\nOpening merge request...");
  await browser.close();

  browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.resolve(__dirname, "../../node_modules/.cache/pr-ticket"),
    defaultViewport: null
  });

  page = await browser.newPage();

  // Set up events wrapped in a promise.
  const waitForClose = new Promise(r => {
    page.on('close', () => {
      r();
      browser.close();
      console.warn("Gitlab ticket process finished\n\n");
    });
  });

  await page.goto(`${
      repoUrl
    }/-/merge_requests/new?utf8=%E2%9C%93&merge_request%5Bsource_project_id%5D=${
      projectId
    }&merge_request%5Bsource_branch%5D=${
      encodeURIComponent(sourceBranch)
    }&merge_request%5Btarget_project_id%5D=${
      projectId
    }&merge_request%5Btarget_branch%5D=dev`
  );

  await page.waitForFunction(() => {
    const node = document.querySelector("#merge_request_title");
    return node !== null && node !== void 0;
  }, { timeout: 0 });

  await page.evaluate((ticketURL, sourceBranch) => {
    document.querySelector("#merge_request_title").value = `PR: ${sourceBranch}`;
    document.querySelector("#merge_request_description").value = `This is a PR request for the ticket: ${ticketURL}`;
  }, ticketURL, sourceBranch);

  console.warn("\n\nWaiting for browser to be closed...\n\n");
  await waitForClose;
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
  const validRepos = new Set(["gitlab"]);
  if (!validRepos.has(repoType)) {
    console.error(`Unsupported repo type: ${repoType}`);
    process.exit(1);
  }

  // If no release notes will be created, let the user know this ticket may not
  // have the information necessary for a proper release
  try {
    releaseNotes({ errorOnEmpty: true })
  }

  catch(err) {
    const shouldContinue = await new AutoComplete({
      name: 'shouldContinue',
      message: 'There are no detected semver messages that will cause a version change. Do you want to continue?',
      limit: 10,
      choices: ["Yes", "No"]
    }).run();

    if (shouldContinue === "No") {
      process.exit(1);
    }
  }

  // We can only do this operation if there is nothing to commit or push
  // This only works if no changes are present
  if (shell.exec("git status --porcelain=v1 2>/dev/null | wc -l | grep 0", { silent: true }).code !== 0) {
    console.error("You have uncommitted changes or the current state of the project can not be determined. Please commit or stash them before continuing.");
    process.exit(1);
  }

  // Retrieve the ticket information from this branch's commit logs
  const { branch, hash, ticketUrl } = await viewTicket(true);
  if (!branch || !hash || !ticketUrl) {
    console.error("Failed to retrieve necessary ticket information from current branch.");
    process.exit(1);
  }

  // Now we open the url to the new merge request
  switch (repoType) {
    case "gitlab":
      await openGitlabPR(repoUrl, branch, ticketUrl);
      break;

    default:
      console.warn("No supported repo type found");
  }
}

module.exports = run;
