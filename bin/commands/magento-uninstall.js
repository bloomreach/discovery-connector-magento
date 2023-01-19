const shell = require("shelljs");
const path = require("path");

// magento_appdata magento_dbdata magento_rabbitmqdata magento_sockdata magento_ssldata
async function run() {
  // We know where this script exists relative to the project. Resolving ./ is
  // unreliable.
  const projectPath = path.resolve(__dirname, "../../");

  // Move to the magento directory
  if (shell.cd(path.resolve(projectPath, ".magento")).code !== 0) {
    console.error("Error: Failed to change directory to .magento directory which is required to remove containers");
    process.exit(1)
  }

  // Stop all running containers
  if (shell.exec("bin/stop").code !== 0) {
    console.error("Error: Failed to stop magento containers");
  }

  // Remove the magento containers
  if (shell.exec("docker compose rm -f -v").code !== 0) {
    console.error("Error: Failed to remove magento containers");
  }

  // Remove volumes
  if (shell.exec("docker volume rm magento_appdata magento_dbdata magento_rabbitmqdata magento_sockdata magento_ssldata").code !== 0) {
    console.error("Error: Failed to remove magento volumes");
  }

  // Move to project directory to delete .magento directory
  if (shell.cd(projectPath).code !== 0) {
    console.error("Error: Failed to change directory to project root");
    process.exit(1);
  }

  // Delete the .magento directory
  console.log("Removing", path.resolve(projectPath, ".magento"));
  if (shell.exec(`rm -rf ${path.resolve(projectPath, ".magento")}`).code !== 0) {
    console.error("Error: Failed to delete magento directory");
    process.exit(1);
  }
}

module.exports = run;
