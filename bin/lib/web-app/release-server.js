const build = require('../build');
const fs = require('fs-extra');
const path = require('path');
const targetProjectDependencies = require('../target-project/target-project-dependencies');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * This performs the bundling process for distribution.
 */
async function run() {
  if (!fs.existsSync(path.resolve('app/server'))) {
    console.log('Tried to build a release for the web app server, but no entry file was found.');
    return;
  }

  process.env.NODE_ENV = 'production';
  const noMangle = "NO_MANGLE" in process.env;

  const config = require(path.resolve(__dirname, '../../../webpack.config.ts'));
  config.entry = path.resolve("app/server");
  config.output.path = path.resolve("dist/app/server");
  config.target = 'node';
  config.externals = {};

  Object.keys(await targetProjectDependencies()).forEach(extern => {
    config.externals[extern] = `require('${extern}')`;
  });

  config.externals = Object.keys(await targetProjectDependencies());

  // We need to modify the uglify optimizer for the no mangle option to work
  if (noMangle) {
    console.log('NO_MANGLE: Preventing class and method mangling for the server environment');
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            mangle: false
          },
        }),
      ],
    };
  }

  console.log('Building app server in', config.output.path);
  await build(config, 'production');

  // Run a quick check to make sure the distribution file was made
  if (!fs.existsSync(path.resolve("dist/app/server/index.js"))) {
    console.error("Failed to create Server output bundle. Exiting process...");
    process.exit(1);
  }
}

module.exports = run;
