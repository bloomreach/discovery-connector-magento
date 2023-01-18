const shell = require('shelljs');
const path = require('path');

async function run(options) {
  const commandPath = path.resolve(__dirname, '../lib/unit-test/run-tests.js');
  shell.exec(`nodemon --delay 0.1 -e ts -x \"node ${commandPath} ${options.pattern ? `-p ${options.pattern}` : ''}\"`);
}

module.exports = run;
