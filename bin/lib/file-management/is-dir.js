const fs = require('fs-extra');

/**
 * Checks if a path is a directory or a file
 */
function isDir(basePath) {
  return fs.lstatSync(basePath).isDirectory();
}

module.exports = isDir;
