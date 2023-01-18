const fs = require('fs-extra');
const path = require('path');

async function run() {
  const packageJson = fs.readJSONSync(path.resolve('package.json'));
  return packageJson.repository || {};
}

module.exports = run;
