/**
 * This script is intended to take in an ip address and deploy folder, then will
 * request a password and rsync the proper project files to a the specified
 * server.
 */

const fs = require("fs-extra");
const path = require("path");
const { prompt } = require("enquirer");
const Rsync = require("rsync");
const shell = require("shelljs");

const projectRoot = path.resolve(__dirname, "../../");

/**
 * Executes ssh to log into the remote server and run the
 */
async function updateRemote(deployInfo) {
  console.log("Updating remote magento server");

  if (
    shell.exec(
      `ssh ${deployInfo.host} "cd ${path.resolve(
        deployInfo.dest,
        ".magento"
      )}; bin/magento setup:upgrade; bin/magento cache:flush"`
    ).code !== 0
  ) {
    console.error(
      "Was not able to upgrade the remote magento server to reflect the deploy"
    );
  }
}

/**
 * Essentially attempts to execute the rsync command in the following format:
 *
 * rsync -av --exclude files src host:dest
 */
async function sync(deployInfo) {
  process.env.MAGENTO_INSTALL_FOLDER = path.resolve(
    deployInfo.dest,
    ".magento"
  );
  process.env.MAGENTO_REMOTE = deployInfo.host;
  process.env.MAGENTO_MODULE = deployInfo.module || process.env.MAGENTO_MODULE;

  console.log(
    "Syncing files",
    deployInfo.src,
    `${process.env.MAGENTO_REMOTE}:${process.env.MAGENTO_INSTALL_FOLDER}`
  );

  await require("../lib/magento/sync-plugin")();
}

/**
 * Entry method for the deploy-qa process
 */
async function run({ dest }) {
  let deployInfo = { host: void 0, src: projectRoot, dest };

  // See if the parameters are available in the local json file
  if (fs.existsSync(path.resolve("deployqa.local.json"))) {
    const local = fs.readJSONSync(path.resolve("deployqa.local.json"));
    deployInfo = {
      ...deployInfo,
      ...local,
    };
  }

  const questions = [
    deployInfo.host
      ? Array.isArray(deployInfo.host)
        ? {
            type: "autocomplete",
            name: "host",
            message: "What host should be deployed to?",
            limit: 10,
            choices: deployInfo.host,
          }
        : void 0
      : {
          type: "input",
          name: "host",
          message: "What host should be deployed to?",
        },
    deployInfo.dest
      ? void 0
      : {
          type: "input",
          name: "dest",
          message: "What host folder should be deployed to?",
        },
  ].filter((d) => d !== void 0);

  if (questions.length > 0) {
    answers = await prompt(questions);
    deployInfo = {
      ...deployInfo,
      ...answers,
    };
  }

  deployInfo.src =
    path.resolve(deployInfo.src) + (deployInfo.src.endsWith("/") ? "/" : "");

  console.log("Deploy Target:\n", deployInfo);

  await sync(deployInfo);
  await updateRemote(deployInfo);
}

module.exports = run;
