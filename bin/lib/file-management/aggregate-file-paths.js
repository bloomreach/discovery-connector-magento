const path = require('path');

/**
 * Takes a file pathing object and outputs a list of the files inside of it.
 */
function aggregateFilePaths(basePath, obj, out = []) {
  Object.keys(obj).forEach(key => {
    const next = obj[key];
    const pathToKey = path.resolve(basePath, key);

    if (typeof next === 'string') {
      out.push(`${pathToKey}${next}`);
    }

    else {
      aggregateFilePaths(pathToKey, next, out);
    }
  });

  return out;
}

module.exports = aggregateFilePaths;
