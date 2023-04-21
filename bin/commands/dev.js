const fs = require("fs-extra");
const path = require("path");
const shell = require("shelljs");
const wait = require("../lib/util/wait");

const projectRoot = path.resolve(__dirname, "../../");

/**
 * Entry method for the dev process
 */
async function run(options) {
  process.env.MAGENTO_MODULE = options.module;
  const MAGENTO_INSTALL_FOLDER =
    process.env.MAGENTO_INSTALL_FOLDER || path.resolve(projectRoot, ".magento");

  // Ensure the magento directory exists.
  if (!fs.existsSync(MAGENTO_INSTALL_FOLDER)) {
    console.error(
      "Error: Magento is not installed. Please run `npm run magento-install` to install magento for this project, or specify MAGENTO_INSTALL_FOLDER env variable with path to install folder."
    );
    process.exit(1);
  }

  if (shell.cd(MAGENTO_INSTALL_FOLDER).code !== 0) {
    console.error("Error: Failed to change directory to .magento directory");
    process.exit(1);
  }

  // Spin up magento server
  let resolveStart;
  const startPromise = new Promise((resolve) => (resolveStart = resolve));
  const startProcess = shell.exec("bin/start", { async: true });

  startProcess.stdout.on("data", (data) => {
    if (data.toString().includes("Container magento-app-1  Started")) {
      resolveStart();
    }
  });

  startProcess.on("exit", function () {
    resolveStart();
  });

  await startPromise;

  // Go to project root directory to so we can execute the sync script
  shell.cd(projectRoot);

  // Fire up a watcher for the project that will sync the files to the .magento
  // directory correctly.
  const syncPath = path.resolve(__dirname, "../lib/magento/sync-plugin.js");
  shell.exec(
    `nodemon -e \"*\" --ignore node_modules --ignore .magento -x \"node ${syncPath} run\"`,
    {
      async: true,
      env: process.env,
    }
  );

  // Wait for the sync to complete once
  await wait(5000);

  // Next commands will be regarding the magento server
  if (shell.cd(MAGENTO_INSTALL_FOLDER).code !== 0) {
    console.error("Error: Failed to change directory to .magento directory");
    process.exit(1);
  }

  // Run the upgrade command if the sync created the plugin for the first time.
  if (shell.exec("bin/magento module:enable Bloomreach_Connector").code !== 0) {
    console.log("Ensuring Module is registered in Magento");

    // Upgrade server to register module
    let resolveUpgrade;
    const upgradePromise = new Promise((resolve) => (resolveUpgrade = resolve));
    const upgradeProcess = shell.exec("bin/magento setup:upgrade", {
      async: true,
    });

    upgradeProcess.stdout.on("data", (data) => {
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
  }

  await wait(1000);
  console.log("\n\n\nDevelopment server started. Press Ctrl+C to stop.");
  console.log("Visit https://magento.test to view the site.\n\n\n");
}

async function handleExit() {
  if (shell.cd(path.resolve(projectRoot, ".magento")).code !== 0) {
    console.error("Error: Could not shut down magento");
    process.exit(0);
  }

  // Upgrade server to register module
  if (shell.exec("bin/stop").code !== 0) {
    console.error("Error: Could not shut down magento");
    process.exit(0);
  }

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
