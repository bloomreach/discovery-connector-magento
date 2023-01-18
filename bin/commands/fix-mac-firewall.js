const shell = require('shelljs');

/**
 * Entry method for the fix mac firewall issue.
 */
async function run() {
  shell.exec('sudo codesign --force --sign - /usr/local/bin/node');
}

module.exports = run;