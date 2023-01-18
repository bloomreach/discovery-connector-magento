const nodemon = require('nodemon');
const path = require('path');
const shell = require('shelljs');
const build = require('../lib/web-app/build-server');

process.env.PRETTIERJSPATH = path.resolve('prettier-loader.js');
build();

// shell.exec(
//   `npm run nodemon -- --watch ${path.resolve('bin/commands')} ${path.resolve('bin/test/logger')}`,
//   { async: true }
// );

// shell.exec(
//   `npm run nodemon -- --watch ${path.resolve('bin/commands')} ${path.resolve('bin/test/logger')}`,
//   { async: true }
// );

// nodemon({
//   script: path.resolve('bin/test/logger'),
//   ext: 'js,json,jsx,ts,tsx,sh,fs',
//   watch: path.resolve('bin/commands'),
// });

// nodemon({
//   script: path.resolve('bin/test/logger'),
//   ext: 'js,json,jsx,ts,tsx,sh,fs',
//   watch: path.resolve('bin/commands'),
// });
