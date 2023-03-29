const shell = require("shelljs");
const path = require("path");

/**
 * After a magento instance finishes installing, there are several steps that
 * must happen afterwards, BUT the installation script sometimes get hung on the
 * magento process and doesn't allow the post installation items to run. Thus,
 * all of those steps are included in this script now.
 */
async function run() {
  const projectPath = path.resolve(__dirname, "../../");

  // Install sample data
  // Display message in a rectangle of stars 3 lines high with some newline
  // padding
  console.warn("\n\n");
  console.warn("*******************************");
  console.warn("* Installing sample data...   *");
  console.warn("*******************************");
  console.warn("\n\n");

  // Move working directory into the magento directory so we can make magento
  // commands easier
  if (shell.cd(path.resolve(projectPath, ".magento")).code !== 0) {
    console.error("Error: Failed to change directory to .magento");
    process.exit(1);
  }

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
  if (
    shell.exec("bin/magento module:disable Magento_TwoFactorAuth").code !== 0
  ) {
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
