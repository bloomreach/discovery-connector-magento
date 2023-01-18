const shell = require("shelljs");
const open = require('open');
const validURL = require('valid-url');

/**
 * This command simply creates a new ticket branch to work in and makes an
 * immediate empty commit to denote the beginning of the ticket which will also
 * enable view-ticket command.
 *
 * set retrieveStats to true if you want the values returned by this method
 * rather than perform the opening action.
 */
async function run(retrieveStats) {
  // Get the current branch name so we can obtain the hash of the ticket
  let result = shell.exec("git rev-parse --abbrev-ref HEAD");

  if (result.code !== 0) {
    console.error("Failed to determine current branch.");
    process.exit(1);
  }

  const branch = result.stdout.trim();
  const branchSplits = branch.split("-");
  const hash = branchSplits[branchSplits.length - 1]?.trim();

  if (!hash) {
    console.error("This branch doesn't seem to be formatted correctly for this operation.");
    process.exit(1);
  }

  // We want to look through the log for the commit with our current branch's
  // ticket name; however, we need to limit how much we look within the project,
  // so we will limit searches to the previous found tag / release.
  result = shell.exec("git for-each-ref --sort=creatordate --format '%(tag)' refs/tags");

  if (result.code !== 0) {
    console.error("Failed to retrieve ordered tag list.");
    process.exit(1);
  }

  const allTags = (result.stdout || "").split("\n");
  let lastTag = allTags[allTags.length - 1];

  if (lastTag) {
    result = shell.exec(`git log ${lastTag}..HEAD --oneline`, { silent: true });
  }

  // If a tag can not be determined, we look at all of the logs (dangerous
  // performance issue)
  else {
    console.warn("No tags found. This may take a long time...");
    result = shell.exec(`git log --oneline`, { silent: true });
  }

  if (!result) {
    console.error("Failed to get log to find relevant commit.");
    process.exit(1);
  }

  // We now loop through each log line and search for the hash of our ticket.
  // This will be the line that contains our URL.
  const allLogs = (result.stdout || "").split("\n");

  for (const log of allLogs) {
    if (log.indexOf(hash) !== -1) {
      const ticketUrl = log.split(hash)[1].trim();

      if (validURL.isWebUri(ticketUrl)) {
        // When retrieve stats is true, we simply return the discovered values
        // instead of open the ticket.
        if (retrieveStats === true) {
          console.log("View Ticket:", {
            branch,
            hash,
            ticketUrl
          })
          return {
            branch,
            hash,
            ticketUrl
          };
        }

        else {
          open(ticketUrl);
          process.exit(0);
        }
      }
    }
  }

  console.error("Could not determine a valid URL to oepn for the current branch");
  process.exit(1);
}

module.exports = run;
