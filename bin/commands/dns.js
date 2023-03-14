const semver = require("semver");
const fs = require("fs-extra");
const shell = require("shelljs");
const path = require("path");

function isWindows() {
  return process.platform === "win32";
}

function min3Segments(version) {
  const segments = version.split(".");

  if (segments.length > 3) {
    throw new Error("Invalid version found: " + version);
  }

  while (segments.length < 3) {
    segments.push("0");
  }

  return segments.join(".");
}

function stop() {
  console.log("Shutting down dnsmasq...");
  shell.exec(`sudo killall dnsmasq`);
}

function handleProcessExit() {
  async function handleExit1() {
    stop();
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

/**
 * Searches the homebrew install for dnsmasq for the latest version available in
 * the homebrew folder then executes the dnsmasq command.
 */
async function run() {
  try {
    if (isWindows()) {
      throw new Error("dnsmasq is not supported on Windows.");
    }
    stop();

    const brewPath = "/usr/local/Cellar/dnsmasq";
    const brewPathExists = await fs.pathExists(brewPath);

    if (!brewPathExists) {
      console.log(
        "dnsmasq is not installed via homebrew.\n Please install dnsmasq via `brew install dnsmasq`"
      );
      return;
    }

    const brewVersions = await fs.readdir(brewPath);

    const mappedVersions = new Map();
    const latestVersion = semver.maxSatisfying(
      brewVersions.map((v) => {
        const mapped = min3Segments(v);
        mappedVersions.set(mapped, v);
        return mapped;
      }),
      "*",
      true
    );

    if (!latestVersion) {
      console.log("No dnsmasq version found.", { brewVersions, latestVersion });
      return;
    }

    const dnsmasqPath = `${brewPath}/${mappedVersions.get(
      latestVersion
    )}/sbin/dnsmasq`;
    const dnsmasqPathExists = await fs.pathExists(dnsmasqPath);

    if (!dnsmasqPathExists) {
      console.log("dnsmasq path does not exist.");
      return;
    }

    const logs = path.resolve(
      __dirname,
      "../../node_modules/.cache/dnsmasq.log"
    );
    handleProcessExit();

    console.log("Running dnsmasq...", { dnsmasqPath });
    shell.config.fatal = true;
    shell.exec(
      `sudo ${dnsmasqPath} --no-hosts --no-daemon --log-queries=${logs} --log-debug -C /usr/local/etc/dnsmasq.conf`
    );
    shell.touch(logs);
    shell.exec(`sudo killall dnsmasq`);
    console.log("Process complete.");
  } catch (err) {
    stop();
  }
}

module.exports = run;
