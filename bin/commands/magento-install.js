/**
 * This script should perform the steps indicated by the tutorial found at
 * https://courses.m.academy/courses/set-up-magento-2-development-environment-docker/lectures/9205849
 *
 * NOTES:
 *
 * - We use a custom onelinesetup to bypass the oneline script repo from
 *   updating and breaking this script. Normally it targets the repo's master
 *   branch, we instead direct it to a hash so it's stable to the current
 *   version.
 *
 * - To update to a new version of magento, you wlll need to look at the
 *   onelinesetup and templat script targetted from the oneline setup repo.
 *
 *   https://github.com/markshust/docker-magento
 *
 *   Please note to use the latest scripts from the repo but copy their contents
 *   to the onelinesetup and template files in this project AND ensure to change
 *   any references to the master branch to a specific hash.
 */

const shell = require("shelljs");
const path = require("path");
const fs = require("fs-extra");
const { prompt } = require("enquirer");

function tutorialMessage() {
  console.error(
    "You may need to consult the tutorials at https://courses.m.academy/courses/set-up-magento-2-development-environment-docker/lectures/9205849"
  );
  console.error(
    "Please note the goal of the tutorial is to install magento 2.4.5-p1 within the '<project root>/.magento' directory."
  );
  console.error("TOUBLE SHOOTING:");
  console.error(
    "- Run 'npm run magento-uninstall' then retry installing again"
  );
  console.error(
    "- Your Access tokens entered are wrong:\n\t* Look in the logs from the install to see if the tokens were not accepted\n\t* go to ~/.composer/auth.json and modify the values there to correct."
  );
  console.error(
    "- Your demo data didn't load: try running '.magento/bin/magento sampledata:deploy' or reinstall"
  );
}

/**
 * Entry method for the install magento process.
 */
async function run(_options) {
  const projectPath = path.resolve(__dirname, "../../");

  // Tell the user they will need to have an adobe market place account created
  await prompt([
    {
      type: "input",
      name: "ok",
      message:
        "Make sure you have API tokens available.\n\t* sign in here https://marketplace.magento.com/\n\t* go to https://marketplace.magento.com/customer/accessKeys/ and create a new token\n\t* THis script will ask for a user name and password. User is the public key, password is the private key. (press enter to continue)",
    },
  ]);

  const { domain } = await prompt([
    {
      type: "input",
      name: "domain",
      message:
        "Insert the host domain you want to use for your magento installation (press enter to use magento.test)",
    },
  ]);

  // Ensure we start at the project root for proper context
  if (shell.cd(projectPath).code !== 0) {
    console.error("Error: Failed to change directory to project root");
    process.exit(1);
  }

  // Ensure the magento directory exists.
  if (!fs.existsSync(path.resolve(projectPath, ".magento"))) {
    if (shell.mkdir(path.resolve(projectPath, ".magento")).code !== 0) {
      console.error("Error: Failed to create .magento directory");
      process.exit(1);
    }
  }

  // Move working directory into the magento directory
  if (shell.cd(path.resolve(projectPath, ".magento")).code !== 0) {
    console.error("Error: Failed to change directory to .magento");
    process.exit(1);
  }

  const onelinePath = path.resolve(
    projectPath,
    "bin/lib/magento/oneline-setup.sh"
  );

  const installTemplatePath = path.resolve(
    projectPath,
    "bin/lib/magento/template.sh"
  );

  // const setupCommand = shell.exec(
  //   `cat ${path.resolve(
  //     projectPath,
  //     "bin/lib/magento/onelinesetup.sh"
  //   )} | bash -s -- magento.test 2.4.5-p1 community`,
  //   { async: true, silent: true }
  // );

  // Execute the oneline script for magento setup. We don't use the curl option
  // as it relies on the master branch only and does not target a stable
  // specific version of magento. Our own script corrects this by targetting the
  // githib hash instead of the master branch.
  // We execute async as it is a blocking process that freezes at the end of the
  // process for some reason. So we wait for the completion message and manually
  // terminate the process so we can continue.
  // These are the files we are targetting but modifying to support the specific
  // hash.
  //  https://raw.githubusercontent.com/markshust/docker-magento/41a7d8269352b8a6e43687d0110a47a987b5aa08/lib/onelinesetup
  //  https://raw.githubusercontent.com/markshust/docker-magento/41a7d8269352b8a6e43687d0110a47a987b5aa08/lib/template
  const setupCommand = shell.exec(
    `cat ${onelinePath} | bash -s -- ${
      domain || "magento.test"
    } 2.4.5-p1 community ${installTemplatePath}`,
    { async: true, silent: true }
  );
  let resolveSetup, killedSetup;
  const completeSetup = new Promise((r) => (resolveSetup = r));
  let buffer = "";

  setupCommand.stdout.on("data", (data) => {
    console.log(data.toString());
    buffer += data.toString().toLowerCase();

    if (buffer.includes("you may now access your magento instance")) {
      killedSetup = true;
      setupCommand.kill();
      resolveSetup();
    }
  });

  setupCommand.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  setupCommand.on("exit", function () {
    resolveSetup();
  });

  await completeSetup;

  if (setupCommand.code !== 0 && !killedSetup) {
    console.error(
      "Error: Failed to execute the curl command to download and initiate the magento installation."
    );
    tutorialMessage();
    process.exit(1);
  }

  // Run the post install items
  await require("./magento-post-install")();

  process.exit(0);
}

module.exports = run;
