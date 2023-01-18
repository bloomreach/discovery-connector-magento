const fs = require('fs-extra');
const path = require('path');
const lyraProjectName = require('../lib/lyra-project/lyra-project-name');
const buildClient = require('../lib/web-app/build-client');
const buildServer = require('../lib/web-app/build-server');
const runAppServer = require('../lib/web-app/run-app-server');

/**
 * Error displayed when the dev script detects something fishy with how the script is being executed.
 */
async function canNotRunError(...message) {
  console.log(`
    \n
    ${message.join('\n    ')}

    Please ensure the dev process is ran from the proper directory context.
    Ensure your cwd is the same as where the package.json is located that
    contains the npm run dev script.

    Also, make sure ${await lyraProjectName()} is installed locally to the project and is
    NOT being used in a global context.
    \n
  `);
}

/**
 * This ensures we can run the dev script within the current environment this command was executed.
 */
async function validateRun(projectRoot) {
  const rootPackage = path.resolve(projectRoot, 'package.json');

  // Let's make sure we are in a context that has our actual project root
  if (fs.existsSync(rootPackage)) {
    if (rootPackage === path.resolve(__dirname, '../../package.json')) {
      return true;
    }

    // Only thing we have to ensure some amount of reliability is to check two things:
    // - The path has a package.json
    // - The package.json is a valid package with the dev script pointing to the design system's dev process
    // - The directory containing the package.json is a part of this file's __dirname
    const json = fs.readJSONSync(rootPackage);
    const devScript = (json.scripts || {}).dev || '';
    if (devScript.indexOf(await lyraProjectName()) < 0 || devScript.indexOf('dev') < 0) {
      canNotRunError(
        `Detected package.json at ${rootPackage}`,
        `does not have the dev script the design system expects.`,
        `It MUST have 'lyra dev'.`
      );
      return false;
    }

    if (__dirname.indexOf(projectRoot) < 0) {
      canNotRunError(
        `The package.json found is not within the same directory line`,
        `as the design system being executed.`,
        `package.json: ${rootPackage}`,
        `__dirname: ${__dirname}`
      );
      return false;
    }
  }

  else {
    canNotRunError('Could not find a package.json file in the current working directory.');
    return false;
  }

  return true;
}

/**
 * Entry method for the dev process
 */
async function run(projectRoot) {
  if (!await validateRun(projectRoot)) return;

  // If we have web app structure then run the web app dev process
  if (fs.existsSync(path.resolve('app'))) {
    await buildClient();
    await buildServer();
    await runAppServer();
  }
}

module.exports = run;
