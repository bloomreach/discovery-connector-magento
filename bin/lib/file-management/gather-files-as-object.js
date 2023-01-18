const fs = require('fs-extra');
const path = require('path');
const isDir = require('./is-dir');

/**
 * Gathers file names into an object and keeps hierarchial structure (a directory is an object)
 */
function gatherFilesAsObject(basePath, out) {
  const files = fs.readdirSync(basePath);

  files.forEach(file => {
    const filePath = path.resolve(basePath, file);

    if (isDir(filePath)) {
      out[file] = {};
      gatherFilesAsObject(filePath, out[file]);
      return;
    }

    const fileName = path.basename(file).split('.')[0];
    out[fileName] = path.extname(file);
  });

  return out;
}

module.exports = gatherFilesAsObject;
