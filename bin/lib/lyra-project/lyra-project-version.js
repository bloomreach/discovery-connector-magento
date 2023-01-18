const fs = require('fs-extra');
const path = require('path');

async function run() {
  const packageJson = fs.readJSONSync(path.resolve(__dirname, '../../../package.json'));
  return packageJson.version || '';
}

module.exports = run;
