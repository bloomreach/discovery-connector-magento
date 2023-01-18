const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');
const targetProjectDependencies = require('../target-project/target-project-dependencies');
const DevServer = require('webpack-dev-server');

/**
 * Entry method for the library dev process
 */
async function run() {
  if (!fs.existsSync(path.resolve('test'))) {
    console.warn(
      'Tried to start development process for the library, but no entry file was found at',
      path.resolve('test')
    );
    return;
  }

  // Set up environment vars
  process.env.DEBUG_PACKAGE = "false";
  process.env.NODE_ENV = 'development';
  process.env.PRETTIERJSPATH = path.resolve(__dirname, '../../..');

  // Establish the proper webpack configuration
  const configPath = path.resolve(__dirname, '../../../webpack.config.ts');
  const config = require(configPath);
  // For our build process we should see which libraries are considered for external bundling
  // config.externals = Object.keys(await targetProjectDependencies());
  console.warn('Using lyra webpack config:', configPath);
  console.warn('Static assets for use will be hosted from:', path.resolve('test/assets'));
  const compiler = webpack(config);

  // Start up a dev server to host the results
  const server = new DevServer(compiler, {
    contentBase: path.resolve('test/assets'),
    compress: true,
    port: process.env.PORT || 8080
  });

  server.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0', () => {
    console.warn(`Starting server on ${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 8080}`);
  });
}

module.exports = run;
