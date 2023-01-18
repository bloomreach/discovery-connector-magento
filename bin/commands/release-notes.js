const shell = require('shelljs');
const { resolve } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const { inc, compare } = require('semver');
const { groupBy, uniq, upperFirst } = require('lodash');
const { readJSONSync, writeJSONSync } = require("fs-extra");

/** @type {{[key: string]: 'breaking' | 'added' | 'fixed' | 'task'}} */
const releaseTags = {
  breaking: 'breaking',

  feat: 'added',
  feature: 'added',
  added: 'added',

  fix: 'fixed',
  fixed: 'fixed',
  hotfix: 'fixed',

  task: 'task',
};

const tagOrder = uniq(Object.values(releaseTags));

/**
 * @param {string} notes
 */
function getReleaseType(notes) {
  const groups = notes
    .toLowerCase()
    .split('\n')
    .map(line => (line.match(/## (\w+)/) || [])[1])
    .filter(Boolean);
  if (groups.includes('breaking')) return 'major';
  if (groups.includes('added')) return 'minor';
  return 'patch';
}

/**
 * Update versions found in additional locations in this project.
 */
async function updateMagentoVersions(newVersion) {
  const composerJson = readJSONSync(resolve('composer.json'));
  composerJson.version = newVersion;
  writeJSONSync(resolve('composer.json'), composerJson, { spaces: 2 });
}

/**
 * @param {string} forVersion The version to build the release notes for
 *
 * @return {string}
 */
function buildReleaseNotes(forVersion) {
  const getTags = shell.exec('git tag --list', { silent: true }, { silent: true });

  if (getTags.code !== 0) {
    console.error("Couldn't get git tags");
    process.exit(1);
  }

  const tags = getTags.stdout.toString().trim()
  .split('\n')
    .sort(compare);

  const previousVersion =
    tags[
      (tags.includes(forVersion) ? tags.indexOf(forVersion) : tags.length) - 1
    ];

  const currentVersionHashExec = shell.exec(`git rev-list -1 ${forVersion}`, { silent: true });

  if (currentVersionHashExec.code !== 0) {
    console.error("Couldn't get current version hash");
    process.exit(1);
  }

  const currentVersionHash = currentVersionHashExec.stdout.toString().trim();

  let previousVersionHashExec =
    shell.exec(`git rev-list -1 ${previousVersion}`, { silent: true });

  if (previousVersionHashExec.code !== 0) {
    previousVersionHashExec = shell.exec(`git rev-list --max-parents=0 HEAD`, { silent: true });

    if (previousVersionHashExec.code !== 0) {
      console.error("Couldn't get previous version hash");
      process.exit(1);
    }
  }

  const previousVersionHash = previousVersionHashExec.stdout.toString().trim();

  const logsExec = shell.exec(`git log --pretty=%B ${previousVersionHash}...${currentVersionHash}`, { silent: true });

  if (logsExec.code !== 0) {
    console.error("Couldn't get logs");
    process.exit(1);
  }

  const logs = logsExec.stdout.toString().split('\n')
    // Convert the lines into an array of tag and message objects
    .map(line => {
      const [, tag = '', message = ''] =
        line.match(/^\s*(\w+?)\s*:\s*(.*)\s*$/) || [];
      return {
        tag: releaseTags[tag.toLowerCase()],
        message: upperFirst(message),
      };
    })
    // Remove lines that do not contain a known tag
    .filter(note => note.tag);

  const groups = groupBy(logs, 'tag');
  // Build the release notes
  const text = tagOrder
    // Remove tags that don't exist in the current output
    .filter(groupName => groups[groupName])
    .map(groupName => {
      const group = groups[groupName];
      return (
        `## ${groupName.replace(/(\w)/, c => c.toUpperCase())}\n\n` +
        group
          .map(({ tag, message }) => `- [\`${tag.toUpperCase()}\`]: ${message}`)
          .join('\n')
      );
    })
    .join('\n\n');

  return text;
}

/**
 * Print release notes since the last release
 *
 * @param {object} options See below
 * @param {string} options.file The file to print release notes to. If this is
 * left blank, then the release notes will be printed to STDOUT.
 * @param {boolean} options.updatePackage Update the package.json
 * @param {boolean} options.tag True if a git tag should be created
 * @param {boolean} options.errorOnEmpty True if no release notes will be created
 */
async function run(options = {}) {
  // Pull in any tags
  const fetchExec = shell.exec('git fetch --tags', { silent: true });

  if (fetchExec.code !== 0) {
    console.error("Couldn't fetch tags");
    process.exit(1);
  }

  // Get the current version
  const pkg = require(resolve('package.json'));
  const { version: currentVersion = '0.0.1' } = pkg;

  const notes = buildReleaseNotes('HEAD');
  const releaseType = getReleaseType(notes);
  const newVersion = releaseType && inc(currentVersion, releaseType);

  if (!newVersion) {
    console.error('Unable to determine next version', { currentVersion });
    process.exit(1);
  }

  // Create the tag if we were told to do so
  if (options.tag) {
    const tagExec = shell.exec(`git tag -a ${newVersion} -m "Release ${newVersion}"`, { silent: true });

    if (tagExec.code !== 0) {
      console.error("Couldn't create tag");
      process.exit(1);
    }
  }

  // Update package.json if we were told to do so
  if (options.updatePackage) {
    const pkg = require(resolve('package.json'));
    pkg.version = newVersion;

    writeFileSync(
      resolve('package.json'),
      JSON.stringify(pkg, null, '  ') + '\n'
    );

    // Special to this project, we need to update additional version values found
    // in additional locations
    await updateMagentoVersions(newVersion);
  }

  const text = `## ${newVersion}\n\n${notes}`;

  // If the notes are empty, throw an error if requested to do so
  if (!notes.trim() && options.errorOnEmpty) {
    throw new Error("No notes were generated as no semver style messages were found");
  }

  // Output the notes to the console or a file
  if (options.file) {
    const file = resolve(options.file);
    const previousText = existsSync(file) ? readFileSync(file) : '';
    writeFileSync(file, `${text}\n\n${previousText}`.trim() + '\n');

    // Commit the changes
    const commitExec = shell.exec(`git commit -am "Release ${newVersion}"`, { silent: true });

    if (commitExec.code !== 0) {
      console.error("Couldn't commit changes");
      process.exit(1);
    }

    // Show information about the release
    const logExec = shell.exec(`git -P log -n 1 -p`);

    if (logExec.code !== 0) {
      console.error("Couldn't get log");
      process.exit(1);
    }

    console.warn(logExec.stdout.toString());
  }

  else {
    console.warn(text);
  }
}

module.exports = run;
