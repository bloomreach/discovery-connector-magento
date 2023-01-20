/**
 * This script should perform the steps indicated by the tutorial found at
 * https://courses.m.academy/courses/set-up-magento-2-development-environment-docker/lectures/9205849
 */

const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
const { prompt } = require('enquirer');

function tutorialMessage() {
  console.error("You may need to consult the tutorials at https://courses.m.academy/courses/set-up-magento-2-development-environment-docker/lectures/9205849");
  console.error("Please note the goal of the tutorial is to install magento 2.4.5-p1 within the '<project root>/.magento' directory.");
  console.error("TOUBLE SHOOTING:");
  console.error("- Run 'npm run magento-uninstall' then retry installing again");
  console.error("- Your Access tokens entered are wrong:\n\t* Look in the logs from the install to see if the tokens were not accepted\n\t* go to ~/.composer/auth.json and modify the values there to correct.");
  console.error("- Your demo data didn't load: try running '.magento/bin/magento sampledata:deploy' or reinstall");
}

/**
 * Entry method for the install magento process.
 */
async function run(_options) {
  const projectPath = path.resolve(__dirname, "../../");

  // Tell the user they will need to have an adobe market place account created
  await prompt([
    {
      type: 'input',
      name: 'ok',
      message: 'Make sure you have API tokens available.\n\t* sign in here https://marketplace.magento.com/\n\t* go to https://marketplace.magento.com/customer/accessKeys/ and create a new token\n\t* THis script will ask for a user name and password. User is the public key, password is the private key. (press enter to continue)',
    }
  ]);

  // Ensure we start at the project root for proper context
  if (shell.cd(projectPath).code !== 0) {
    console.error("Error: Failed to change directory to project root");
    process.exit(1);
  }

  // Ensure the magento directory exists.
  if (!fs.existsSync(path.resolve(projectPath, '.magento'))) {
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


  // Execute the curl command to download and initiate the magento installation.
  // We execute async as it is a blocking process that freezes at the end of the
  // process for some reason. So we wait for the completion message and manually
  // terminate the process so we can continue.
  const setupCommand = shell.exec("curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- magento.test 2.4.5-p1 community", { async: true, silent: true });
  let resolveSetup, killedSetup;
  const completeSetup = new Promise((r) => resolveSetup = r);

  setupCommand.stdout.on('data', (data) => {
    console.log(data.toString());
    if (data.toString().includes("You may now access your Magento instance")) {
      killedSetup = true;
      setupCommand.kill();
      resolveSetup();
    }
  });

  setupCommand.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  setupCommand.on("exit", function() {
    resolveSetup();
  });

  await completeSetup;

  if (setupCommand.code !== 0 && !killedSetup) {
    console.error("Error: Failed to execute the curl command to download and initiate the magento installation.");
    tutorialMessage();
    process.exit(1);
  }

  // Install sample data
  // Display message in a rectangle of stars 3 lines high with some newline
  // padding
  console.warn("\n\n");
  console.warn("*******************************");
  console.warn("* Installing sample data...   *");
  console.warn("*******************************");
  console.warn("\n\n");
  // Delete the magento installation git repo as nested repos is just confusing
  if (shell.rm("-rf", path.resolve(projectPath, ".magento/.git")).code !== 0) {
    console.error("Error: Failed to delete the magento installation git repo.");
    process.exit(1);
  }

  if (shell.exec("bin/magento sampledata:deploy").code !== 0) {
    console.error("Error: Failed to install sample data.");
    process.exit(1);
  }

  if (shell.exec("bin/magento setup:upgrade").code !== 0) {
    console.error("Error: Failed to install sample data.");
    process.exit(1);
  }

  // Disable 2FA
  if (shell.exec("bin/magento module:disable Magento_TwoFactorAuth").code !== 0) {
    console.error("Error: Failed to disable 2FA.");
    process.exit(1);
  }

  // Final cache flush
  if (shell.exec("bin/magento cache:flush").code !== 0) {
    console.error("Error: Failed to flush cache.");
    process.exit(1);
  }

  process.exit(0);
}

module.exports = run;
