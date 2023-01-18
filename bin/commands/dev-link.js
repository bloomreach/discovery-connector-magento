const fs = require('fs-extra');
const path = require("path");
const wait = require("../lib/util/wait");

/**
 * This runs the dev script but first will replace the br-ui library with a
 * specialized package built linking the source code to this project directly
 * for quicker and easier debugging.
 */
async function run(libPath, projectRoot) {
  libPath = path.resolve(libPath);

  if (!fs.existsSync(libPath)) {
    console.error('The specified path does not seem to exist');
  }

  const nodeModules = path.resolve(__dirname, '../../node_modules');
  const libDevPackage = path.resolve(libPath, 'package.json');

  if (!fs.existsSync(libDevPackage)) {
    console.error("Could not find a package.json for the br-ui project specified", libPath);
    process.exit(1);
  }

  // Get the package.json for the library.
  const libPackage = fs.readJSONSync(libDevPackage);
  // Get the name of the library to link
  const libName = libPackage.name;
  // Get the library, if it exists, within this project's node_modules
  const lib = path.resolve(nodeModules, libName);
  // Get the library export folder from the project to ensure it exists.
  const libDevLib = path.resolve(libPath, 'lib');

  if (!fs.statSync(libDevLib).isDirectory()) {
    console.error('The path to "lib" in the target library is NOT a directory', libDevLib);
    process.exit(1);
  }

  if (!fs.existsSync(nodeModules)) {
    console.error('Could not find node_modules within this project.', nodeModules);
    process.exit(1);
  }

  if (!fs.existsSync(libDevLib)) {
    console.error('The linked project does not look like a library project where the all the code is sourced from a "lib" folder.', libDevLib);
    process.exit(1);
  }

  try {
    // Take the current installation and put rename it to a backup name.
    if (fs.existsSync(lib)) {
      fs.rename(lib, path.resolve(nodeModules, `${libName}.bak`));
      await wait(500);
    }

    // Make a new empty directory for the temp version of the library
    fs.mkdirSync(lib);
    await wait(500);
    // Write our own package.json to the temp directory so we can point to a
    // proper main entry file
    libPackage.main = './lib/index.ts';
    libPackage.types = './lib/index.ts';
    fs.writeJSONSync(path.resolve(lib, 'package.json'), libPackage);
    await wait(500);
    // Link the lib folder into our temp folder using a symlink (the link should
    // no longer work if the file source get's deleted)
    fs.symlinkSync(libDevLib, path.resolve(lib, 'lib'), 'dir');
  }

  catch (err) {
    console.error('Failed to link the library', err);
    process.exit(1);
  }

  // Run the dev script
  try {
    require('./dev')(projectRoot);
  }

  catch (err) {
    console.error('Failed to run the dev script', err);
    process.exit(1);
  }

  async function handleExit1() {
    console.warn("EXIT DEV SCRIPT");

    try {
      // Remove the temp directory and rename the backup back to the original
      fs.rmdirSync(lib);

      if (fs.existsSync(path.resolve(nodeModules, `${libName}.bak`))) {
        fs.rename(path.resolve(nodeModules, `${libName}.bak`), lib);
      }
    } catch (err) {
      console.log("Could not set permissions on hosts file");
    }
  }

  async function handleExit() {
    process.exit(0);
  }

  // Catch when app is closing
  process.on("exit", handleExit1);
  // Catch ctrl+c event
  process.on("SIGINT", handleExit);
  // Catch "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", handleExit);
  process.on("SIGUSR2", handleExit);
  process.on("SIGTERM", handleExit);
  // Catch uncaught exceptions
  process.on("uncaughtException", handleExit);
}

module.exports = run;
