const build = require('../build');
const fs = require('fs-extra');
const path = require('path');
const targetProjectDependencies = require('../target-project/target-project-dependencies');

/**
 * This performs the bundling process for distribution.
 */
async function run() {
  if (!fs.existsSync(path.resolve('app/client/index.ts'))) {
    console.log('Tried to start development process for the app client, but no entry file was found.');
    return;
  }

  process.env.PRETTIERJSPATH = path.resolve(__dirname, '../../..');
  const config = require(path.resolve(__dirname, '../../../webpack.config.ts'));
  config.entry = path.resolve("app/client");
  config.externals = Object.keys(await targetProjectDependencies());
  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 1000,
    ignored: ['files/**/*.js', 'node_modules/**']
  };
  config.output.path = path.resolve("build/client");

  console.log('Building app client in', config.output.path);
  await build(config, 'development');
}

module.exports = run;
