/**
 * This is to aid in developing the magento extension using a locally installed
 * magento application within the project folder.
 *
 * This will simply sync the files from this project to the src/app/code so the
 * project will properly register the extension.
 *
 * Symlinks to the files are NOT supported by Magento even though the option is
 * still in the dev settings. Magento still requires the files be beneath the
 * magento projects root folder.
 */
const Rsync = require("rsync");
const path = require("path");
const rmrf = require("rimraf");
const shell = require("shelljs");
const fs = require("fs-extra");

async function run() {
  let resolve;
  const promise = new Promise((r) => (resolve = r));

  // Ensure reliable project root path.
  const projectRoot = path.resolve(__dirname, "../../../");
  const MAGENTO_INSTALL_FOLDER =
    process.env.MAGENTO_INSTALL_FOLDER || path.resolve(projectRoot, ".magento");
  const MAGENTO_REMOTE = process.env.MAGENTO_REMOTE || false;
  const MAGENTO_MODULE = process.env.MAGENTO_MODULE;
  const INSTALL_DIR = path.resolve(
    MAGENTO_INSTALL_FOLDER,
    `src/app/code/${MAGENTO_MODULE}`
  );

  let rsync;

  if (!MAGENTO_MODULE) {
    console.log("No MAGENTO_MODULE environment specified. Sync aborted.");
    process.exit(1);
  }

  // Checks remote file system
  if (MAGENTO_REMOTE) {
    // Ensure the plugin directory exists. Using ssh remote commands to ensure a
    // path to the directory exists, the directory is cleaned, and then remade.
    if (
      shell.exec(
        `ssh ${MAGENTO_REMOTE} "mkdir -p ${INSTALL_DIR}; rm -rf ${INSTALL_DIR}; mkdir -p ${INSTALL_DIR}"`
      ).code !== 0
    ) {
      console.error(
        "Was not able to create the remote magento plugin directory"
      );
      process.exit(1);
    }

    // Build the command
    rsync = new Rsync()
      .shell("ssh")
      .flags("az")
      .source(projectRoot + "/")
      .destination(`${MAGENTO_REMOTE}:${INSTALL_DIR}`);
  }

  // Checks local file system
  else {
    if (!fs.existsSync(MAGENTO_INSTALL_FOLDER)) {
      console.error(
        ".magento directory not found. Please run `npm run magento-install` to install magento for this project."
      );
      process.exit(1);
    }

    // Ensure the plugin directory exists.
    fs.ensureDirSync(INSTALL_DIR);

    // Ensure all files all cleaned so they sync correctly and won't leave behind
    // fragments
    rmrf.sync(INSTALL_DIR);

    // Ensure the plugin directory exists.
    fs.ensureDirSync(INSTALL_DIR);

    console.log("Syncing", {
      from: projectRoot,
      to: INSTALL_DIR,
    });

    // Build the command
    rsync = new Rsync()
      .shell("ssh")
      .flags("az")
      .source(projectRoot + "/")
      .destination(INSTALL_DIR);
  }

  rsync.exclude([
    ".git",
    ".idea",
    "node_modules",
    "scripts",
    ".magento",
    "*.local.*",
    "project.tar.gz",
  ]);

  // Log output
  rsync.output(
    function (data) {
      console.log(data.toString());
    },
    function (data) {
      console.error(data.toString());
    }
  );

  // Execute the command
  rsync.execute(function (error, code, cmd) {
    console.log("Sync complete", cmd);
    resolve();
  });

  await promise;
}

if (process.argv[2] === "run") {
  run();
}

module.exports = run;
