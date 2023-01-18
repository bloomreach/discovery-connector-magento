const open = require('open');
const validURL = require('valid-url');
const hostile = require('hostile');
const colors = require('colors');
const fs = require('fs-extra');
const shell = require("shelljs");
const path = require('path');

function isFunction(val) {
  return val && typeof val === "function";
}

function testFltmc() {
  // https://stackoverflow.com/a/28268802
  try {
    const p = shell.exec('fltmc');
    return p.code === 0;
  } catch {
    return false;
  }
}

/**
 * Checks if the script is being run by an administrator or root
 */
function isAdmin() {
  if (process.platform !== 'win32') {
    return process.getgid() === 0;
  }

  // https://stackoverflow.com/a/21295806/1641422
  const p = shell.exec(`fsutil dirty query ${process.env.systemdrive}`);
  if (p.code !== 0) {
    return testFltmc();
  }

  return false;
}

/**
 * Wraps a method that normally has an async callback pattern into a Promise,
 * thus making await patterns possible.
 */
function promisify(context, methodName, ...args) {
  return new Promise((resolve, reject) => {
    const method = context[methodName];

    if (!isFunction(method)) {
      reject(new Error(`${methodName} is not a function`));
      return;
    }

    method(...args, (error) => {
      if (error) {
        console.warn(error);
        reject(error);
        process.exit(1);
      } else {
        console.warn("Success", methodName, ...args);
        resolve(void 0);
      }
    });
  });
}

/**
 * This looks at the package.json and modifies the host file to include the
 * hosts specified in the "hosts" property. This will only work if this script
 * was ran as an administrator.
 */
async function configureHosts() {
  // Get the package for the project
  const pkg = fs.readJSONSync(path.resolve('package.json'));
  const hosts = pkg.hosts;

  // No hosts present, means we do not need to do anything in this process.
  if (!hosts) return;

  // Can only run if process is an admin role. Show a warning if hosts are
  // present but process is not admin ran.
  if (!isAdmin() && hosts) {
    console.warn(
      colors.red(" *************************************************************************\n"),
      colors.red("* Run this script as administrator to configure hosts if failure occurs *\n"),
      colors.red("* Or check your permissions on your hosts file.                         *\n"),
      colors.red("*************************************************************************\n")
    );
  }

  const keys = Object.keys(hosts);

  console.warn(colors.yellow("Modifying hosts file..."));
  for (const key of keys) {
    try {
      await promisify(hostile, "set", key, hosts[key]);
    } catch (err) {
      console.warn(colors.red(err.message));
    }
  }
}

/**
 * This command simply opens a URL via an npm command. This makes it super
 * simple to change the figma url for a given project:
 *
 * eg -
 * url: "node bin/main url \"https://figma.com\""
 */
async function run(url) {
  configureHosts();

  if (Array.isArray(url)) {
    url.forEach(uri => {
      if (validURL.isWebUri(uri)) {
        open(uri);
      }
    })
  }

  else if (validURL.isWebUri(url)) {
    open(url);
  }
}

module.exports = run;
