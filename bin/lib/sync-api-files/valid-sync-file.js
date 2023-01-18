const path = require('path');

const validExtensions = [
  'js',
  'jsx',
  'ts',
  'tsx'
];

/**
 * This checks if a file path will be a file that can have a mirrored sync file created for it.
 */
function validSyncFile(filePath) {
  const extensions = path.extname(filePath).split('.');
  const extension = extensions[extensions.length - 1];
  return validExtensions.indexOf(extension) >= 0;
}

module.exports = validSyncFile;
