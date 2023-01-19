const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const wait = require('../lib/util/wait');


/**
 * Entry method for the dev process
 */
async function run() {
  const projectRoot = path.resolve(__dirname, "../../");

  // Ensure the magento directory exists.
  if (!fs.existsSync(path.resolve(projectRoot, ".magento"))) {
    console.error("Error: Magento is not installed. Please run `npm run magento-install` to install magento for this project.");
    process.exit(1);
  }

  if (shell.cd(path.resolve(projectRoot, ".magento")).code !== 0) {
    console.error("Error: Failed to change directory to .magento directory");
    process.exit(1);
  }

  // Spin up magento server
  shell.exec("bin/start", { async: true });
  // Return to project root dir
  shell.cd(projectRoot);

  // Fire up a watcher for the project that will sync the files to the .magento
  // directory correctly.
  const syncPath = path.resolve(__dirname, "../lib/magento/sync-plugin.js")
  shell.exec(`nodemon -e \"*\" --ignore node_modules --ignore .magento -x \"node ${syncPath}\"`, { async: true });

  // Wait for the sync to complete once
  await wait(5000);

  // Run the upgrade command if the sync created the plugin for the first time.
  if (shell.exec("bin/magento module:enable Bloomreach_Connector").code !== 0) {
    console.log("Ensuring Module is registered in Magento");

    if (shell.cd(path.resolve(projectRoot, ".magento")).code !== 0) {
      console.error("Error: Failed to change directory to .magento directory");
      process.exit(1);
    }

    // Upgrade server to register module
    shell.exec("bin/magento setup:upgrade");
    // Enable the module for use
    shell.exec("bin/magento module:enable Bloomreach_Connector");
    // Return to project root dir
    shell.cd(projectRoot);
  }
}

module.exports = run;
