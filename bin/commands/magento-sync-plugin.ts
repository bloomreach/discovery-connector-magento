const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const wait = require('../lib/util/wait');

const projectRoot = path.resolve(__dirname, "../../");

/**
 * Same as the magento dev process, except this runs a single time without
 */
async function run() {
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
  let resolveStart;
  const startPromise = new Promise((resolve) => resolveStart = resolve);
  const startProcess = shell.exec("bin/start", { async: true });

  startProcess.stdout.on('data', (data) => {
    if (data.toString().includes("Container magento-app-1  Started")) {
      resolveStart();
    }
  });

  startProcess.on("exit", function () {
    resolveStart();
  });

  await startPromise;

  // Return to project root dir
  shell.cd(projectRoot);

  // Perform a one time sync to the magento server
  const syncPath = path.resolve(__dirname, "../lib/magento/sync-plugin.js");
  console.warn("Syncing files to magento instance.");
  shell.exec(`node ${syncPath}`, { async: true });

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
    let resolveUpgrade;
    const upgradePromise = new Promise((resolve) => resolveUpgrade = resolve);
    const upgradeProcess = shell.exec("bin/magento setup:upgrade", { async: true });

    upgradeProcess.stdout.on('data', (data) => {
      if (data.toString().includes("Enabling caches:")) {
        resolveUpgrade();
      }
    });

    upgradeProcess.on("exit", function () {
      resolveUpgrade();
    });

    await upgradePromise;

    // Enable the module for use
    shell.exec("bin/magento module:enable Bloomreach_Connector");
    // Return to project root dir
    shell.cd(projectRoot);
  }

  await wait(1000);
  console.log("\n\n\nMagento server started and files synced.");
  process.exit(0);
}

async function handleExit() {
  process.exit(0);
}

// Catch when app is closing
process.on("exit", handleExit);
// Catch ctrl+c event
process.on("SIGINT", handleExit);
// Catch "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", handleExit);
process.on("SIGUSR2", handleExit);
process.on("SIGTERM", handleExit);
// Catch uncaught exceptions
process.on("uncaughtException", handleExit);

module.exports = run;
