const { removeSync, existsSync, writeJSONSync, readJSONSync } = require('fs-extra');
const path = require("path");
const shell = require('shelljs');
const wait = require('../lib/util/wait');

/**
 * Executes typescript type compilation without emitting anything. This can be
 * used to find errors in the project before a release is attempted. Or you can
 * run this as nodemon process to find errors as development happens.
 */
async function runTypescript() {
  if (!existsSync(path.resolve('lib'))) {
    console.warn('Skipping ts declaration file generation as no app source code is present');
    return;
  }

  // Build declaration files for the library only
  const tsConfig = readJSONSync(path.resolve('tsconfig.json'));
  tsConfig.include = ["lib", "dts"];
  tsConfig.exclude = tsConfig.exclude || [];
  // tsConfig.exclude.push("lib/server");
  writeJSONSync(path.resolve('tsconfig.temp.json'), tsConfig);
  // Ensure the file system has flushed the temp file to disk
  await wait(500);

  if (
    shell.exec(
      `tsc -d --incremental --noemit --pretty --tsBuildInfoFile ${path.resolve('node_modules/.cache/tsc/tsc.tsbuildinfo')} --outDir ${path.resolve('dist/lib')} --project ${path.resolve('tsconfig.temp.json')}`
    ).code !== 0
  ) {
    console.log('Failed to compile type declarations');
    removeSync(path.resolve('tsconfig.temp.json'));
    process.exit(1);
  }

  if (shell.exec(`tslint '${path.resolve("lib/**/*.ts")}?(x)'`).code !== 0) {
    console.log('Failed tslint checks.');
    removeSync(path.resolve('tsconfig.temp.json'));
    process.exit(1);
  }

  removeSync(path.resolve('tsconfig.temp.json'));
}

async function run() {
  await runTypescript();
}

module.exports = run;
