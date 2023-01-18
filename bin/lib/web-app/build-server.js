const build = require('../build');
const fs = require('fs-extra');
const path = require('path');
const targetProjectDependencies = require('../target-project/target-project-dependencies');

/**
 * This performs the bundling process for distribution.
 */
async function run() {
  if (!fs.existsSync(path.resolve('app/server'))) {
    console.log('Tried to start development process for the app server, but no entry file was found.');
    return;
  }

  const config = require(path.resolve(__dirname, '../../../webpack.config.ts'));
  config.entry = path.resolve("app/server");
  config.output.path = path.resolve("build/server");
  config.target = 'node';
  config.externals = {};

  Object.keys(await targetProjectDependencies()).forEach(extern => {
    config.externals[extern] = `require('${extern}')`;
  });

  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 1000,
    ignored: ['files/**/*.js', 'node_modules/**']
  };

  console.log('Building app server in', config.output.path);
  await build(config, 'development');
}

module.exports = run;
