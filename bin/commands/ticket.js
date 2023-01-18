const { AutoComplete, prompt } = require('enquirer');
const crypto = require('crypto');
const shell = require("shelljs");
const colors = require("colors");

function command(cmd) {
  console.warn(cmd);
  return shell.exec(cmd);
}

/**
 * This command simply creates a new hotfix branch to work in and makes an
 * immediate empty commit to denote the beginning of the hotfix which will also
 * enable view-ticket command.
 */
async function run(ticketUrl, branchName) {
  if (!ticketUrl || !ticketUrl.trim()) {
    console.error("A ticket URL is required for this command\n", colors.yellow("Usage: npm run hotifx <ticket-url> <branch-name>"));
    process.exit(1);
  }

  if (!branchName) {
    console.error("A branch name is required for this command]\n", colors.yellow("Usage: npm run hotifx <ticket-url> <branch-name>"));
    process.exit(1);
  }

  const hash = crypto.createHash('shake128').update(ticketUrl).digest('hex');
  console.log(`${branchName}-${branchName}-${hash}`);

  // This only works if no changes are present
  if (command("git status --porcelain=v1 2>/dev/null | wc -l | grep 0").code !== 0) {
    console.error("You have uncommitted changes or the current state of the project can not be determined. Please commit or stash them before continuing.");
    process.exit(1);
  }

  // Make sure local repo is up to date
  if (command('git fetch').code !== 0) {
    console.error("Failed to fetch remote changes.");
    process.exit(1);
  }

  // Checkout the current dev branch
  if (command('git checkout dev').code !== 0) {
    console.error("Failed to checkout dev branch.");
    process.exit(1);
  }

  const selectedType = await new AutoComplete({
    name: 'selectedType',
    message: 'Type of ticket are you working on:',
    limit: 10,
    choices: ["feature", "hotfix", "task"]
  }).run();

  // Create a new branch based on the current dev branch. It's name will be
  // ${selectedType}/<branch name>-<hash of ticketUrl>.
  if (command(`git checkout -b ${selectedType}/${branchName}-${hash}`).code !== 0) {
    console.error(`Failed to create ${selectedType} branch.`);
    process.exit(1);
  }

  // Create an empty commit that contains ${branchName}-<hash> in the message so we can
  // make view ticket command work.
  if (command(`git commit --allow-empty -m "${branchName}-${hash} ${ticketUrl}"`).code !== 0) {
    console.error("Failed to create marking commit.");
    process.exit(1);
  }
}

module.exports = run;
