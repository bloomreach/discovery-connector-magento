const shell = require('shelljs');
const path = require('path');
const prettier = require('prettier');
const glob = require('glob');
const fs = require('fs-extra');
const commander = require('commander');

const { Command } = commander;
const program = new Command();
const options = {};

program.version('0.0.1');
program.option(
  '-p, --pattern [param]',
  `
    Provides a pattern for certain operations to utilize. This is primarily
    used by unit tests to filter tests to specified tests.
  `
);

program.parse(process.argv);
options.pattern = program.pattern;

/**
 * The prettier CLI is giving us issues with running using shelljs, so we will
 * manually run prettier across all ts files in the unit test folder
 */
async function runPrettier() {
  let resolve;
  const p = new Promise(r => (resolve = r));

  glob(path.resolve('unit-test', '**', '*.ts'), async (err, matches = []) => {
    if (err) {
      console.warn(err);
      return;
    }

    const promises = matches.map(async fileName => {
      try {
        const source = fs.readFileSync(fileName, { encoding: 'utf8' });
        const config = Object.assign(
          {},
          await prettier.resolveConfig(fileName),
          { parser: 'typescript' }
        );
        const pretty = prettier.format(source, config);

        if (pretty !== source) {
          try {
            fs.writeFileSync(fileName, pretty);
          }
          catch (error) {
            console.warn(error);
          }
        }
      } catch (error) {
        console.warn("Could not run prettier for", fileName);
        console.warn(error?.stack || error?.message)
      }
    });

    await Promise.all(promises);
    resolve();
  });

  await p;
}

async function run() {
  // See if we are running the unit tests with the need to attach a debug console
  const debug = Boolean(process.env.DEBUG);
  const pattern = process.env.TEST_PATTERN;
  const watch = process.env.WATCH;
  // Run prettier once
  await runPrettier();

  if (debug) {
    shell.exec(`node --inspect-brk ${path.resolve("node_modules/.bin/jest")} --runInBand ${watch ? "--watchAll" : ""} --verbose --colors --config jest.config.js ${pattern ? `--testNamePattern ${pattern}` : ''}`);
  }

  else {
    shell.exec(`jest ${watch ? "--watchAll" : ""} --verbose --colors --config jest.config.js ${pattern ? `--testNamePattern ${pattern}` : ''}`);
  }
}

run();
