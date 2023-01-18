const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

/**
 * Starts a server with a given entry point.
 */
async function startServer(pathToServer) {
  if (!fs.existsSync(pathToServer)) {
    console.warn("Attempted to start a server but no server distribution was found at", pathToServer);
    return false;
  }

  shell.exec(`node ${pathToServer}`);
  return true;
}

/**
 * Starts the Lyra API hosting if a lyra app distribution is available
 */
async function startLyraAPI() {
  const pathToServer = path.resolve('docs/index.js');
  return await startServer(pathToServer);
}

/**
 * Starts the web app if a web app server is available
 */
async function startWebApp() {
  // Tell the process where to find it's resources that were specified in client
  process.env.RESOURCE_PATH = path.resolve('dist/app/client');
  // Get the path to our server bundle
  const pathToServer = path.resolve('dist/app/server/index.js');
  // Start the server distribution
  return await startServer(pathToServer);
}

/**
 * Entry method for the start command
 */
async function run(target) {
  // Default our port to a proper HTTP port protocol
  const { PORT = "80" } = process.env;
  process.env.PORT = PORT;

  let serverRunning = false;

  switch (target) {
    case 'app':
      serverRunning = await startWebApp();
      break;

    case 'lyra':
      serverRunning = await startLyraAPI();
      break;

    // Do nothing if a proper target was not picked
    default:
      if (target) console.warn('Invalid target for start script specified', target);
      break;
  }

  // If we havn't been able to pick a server based on target, then we attempt to start the server via default behavior
  if (!serverRunning) {
    serverRunning = await startWebApp();
    if (serverRunning) return;
    serverRunning = await startLyraAPI();
    if (serverRunning) return;
  }
}

module.exports = run;
