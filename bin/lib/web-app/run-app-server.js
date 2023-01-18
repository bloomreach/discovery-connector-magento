const nodemon = require('nodemon');
const path = require('path');
const shell = require('shelljs');
const hostile = require('hostile');

/**
 * Entry method for the app dev server
 */
async function run() {
  process.env.RESOURCE_PATH = path.resolve('build/client');
  nodemon({
    exec: `node --inspect ${path.resolve('build/server')}`,
    // script: path.resolve('build/server'),
    ext: 'js,json,jsx,ts,tsx,sh,fs',
    watch: path.resolve('build/server'),
    delay: 1000,
    // inspect: "0.0.0.0:9229",
  });

  async function handleExit1() {
    console.warn("EXIT BUILD SERVER");
  }

  async function handleExit() {
    process.exit(0);
  }

  // Catch when app is closing
  process.on("exit", handleExit1);
  // Catch ctrl+c event
  process.on("SIGINT", handleExit);
  // Catch "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", handleExit);
  process.on("SIGUSR2", handleExit);
  process.on("SIGTERM", handleExit);
  // Catch uncaught exceptions
  process.on("uncaughtException", handleExit);
}

module.exports = run;
