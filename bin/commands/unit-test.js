const shell = require('shelljs');
const path = require('path');

async function run(options) {
  const commandPath = path.resolve(__dirname, '../lib/unit-test/run-tests.js');
  shell.exec(`node ${commandPath} ${options.pattern ? `-p ${options.pattern}` : ''}`);
}

module.exports = run;
