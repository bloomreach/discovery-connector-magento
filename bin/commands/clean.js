const rmrf = require("rimraf");
const path = require("path");
const fs = require("fs");

/**
 * This script cleans out storybook caching that causes updates to be hidden
 * when editing storybook configuration.
 */
async function run() {
  const cache = path.resolve(__dirname, "../../node_modules/.cache/");
  const build = path.resolve(__dirname, "../../build");

  if (fs.existsSync(cache)) {
    rmrf.sync(cache);
    console.log("Cache: Clean complete");
  }

  else {
    console.log("Cache: Already clean");
  }

  if (fs.existsSync(build)) {
    rmrf.sync(build);
    console.log("Build: Clean complete");
  }

  else {
    console.log("Build: Already clean");
  }
}

module.exports = run;
