const build = require('../build');
const fs = require('fs-extra');
const path = require('path');
const targetProjectDependencies = require('../target-project/target-project-dependencies');

/**
 * This performs the bundling process for distribution.
 */
async function run(env) {
  if (!fs.existsSync(path.resolve('app/client'))) {
    console.log('Tried to make a release for the web app client, but no entry file was found.');
    return;
  }

  process.env.BUILD_ENV = env;
  process.env.PRETTIERJSPATH = path.resolve(__dirname, '../../..');
  const config = require(path.resolve(__dirname, '../../../webpack.config.ts'));
  config.entry = path.resolve("app/client");
  config.output.path = path.resolve("dist/app/client", env);
  config.externals = Object.keys(await targetProjectDependencies());

  console.log('Building app client in', config.output.path);
  await build(config, 'production');

  // Run a quick check to make sure the distribution file was made
  if (!fs.existsSync(path.resolve(`dist/app/client/${env}/index.js`))) {
    console.error("\n\nFailed to create Client output bundle. Exiting process...\n\n");
    process.exit(1);
  }
}

module.exports = run;
