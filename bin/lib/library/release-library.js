const path = require('path');
const fs = require('fs');
const build = require('../build');
const targetProjectName = require('../target-project/target-project-name');
const targetProjectDependencies = require('../target-project/target-project-dependencies');

/**
 * Bundles the library for distribution
 */
async function run() {
  if (!fs.existsSync(path.resolve('lib'))) {
    console.warn("No library project found for bundling release at:", path.resolve('lib'));
    return;
  }

  // Get the config for webpack as is typical for our build system
  const webpackConfig = require(path.resolve(__dirname, '../../../webpack.config.ts'));
  // Change the library to the project name
  webpackConfig.output.library = {
    // Name this library attaches itself to the global scope object (window, etc)
    name: (await targetProjectName()).split("@").join("").split("/").join("_"),
    type: "umd",
  };
  // For our build process we should see which libraries are considered for external bundling
  webpackConfig.externals = Object.keys(await targetProjectDependencies());
  // Specify the entry
  webpackConfig.entry = path.resolve("lib");
  // Specify the ouput bundle file location
  webpackConfig.output.path = path.resolve("dist/lib");
  // Run the build script with our modified configuration
  await build(webpackConfig, "production");

  // Run a quick check to make sure the distribution file was made
  if (!fs.existsSync(path.resolve("dist/lib/index.js"))) {
    console.error("Failed to create lib output bundle. Exiting process...");
    process.exit(1);
  }
}

module.exports = run;
