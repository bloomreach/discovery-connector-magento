const fs = require('fs-extra');
const path = require('path');
const deepmerge = require('deepmerge');

async function run() {
  const packageJson = fs.readJSONSync(path.resolve('package.json'));

  return deepmerge(
    packageJson.dependencies || {},
    packageJson.peerDependencies || {}
  );
}

module.exports = run;
