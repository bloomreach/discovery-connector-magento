const path = require('path');

/**
 * This retrieves the lyra file that matches the input library file
 */
async function run(file) {
  const libPath = path.resolve('lib');
  const lyraAPIPath = path.resolve('lyra/lib');
  // First, see if there is an API file for the provided extension
  let pathAfterLib = file.split(libPath).join('');

  // Make sure the file path does not retain a file separator at the beginning or it will assume the path is from
  // the root.
  if (pathAfterLib[0] === path.sep) {
    pathAfterLib = pathAfterLib.substr(1);
  }

  // Get the path to our API source
  const pathToLyraFile = path.resolve(lyraAPIPath, pathAfterLib);

  return pathToLyraFile;
}

module.exports = run;
