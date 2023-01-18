const fs = require('fs-extra');
const path = require('path');
const diff = require('deep-object-diff');
const { Select } = require('enquirer');
const newAPIFile = require('../lib/sync-api-files/new-api-file');
const gatherFilesAsObject = require('../lib/file-management/gather-files-as-object');
const aggregateFilePaths = require('../lib/file-management/aggregate-file-paths');
const validSyncFile = require('../lib/sync-api-files/valid-sync-file');

/**
 * Entry method for the sync process
 */
async function run() {
  if (path.resolve('package.json') === path.resolve(__dirname, '../../package.json')) {
    console.log(`
      Lyra should not perform a sync process on itself due to its destructive
      nature. The lyra folder in this project contains the actual foundation
      work of the lyra application itself.
    `);
    return;
  }

  // First prompt to see if we want to
  let willSync = await new Select({
    name: 'willInitFiles',
    message: `Do you want to perform a sync between your lyra files and lib?`,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willSync === 'No') {
    console.log(`The sync operation was cancelled.`);
    return;
  }

  // Get the two folder paths that we are going to sync the files between
  const libPath = path.resolve('lib');
  const lyraAPIPath = path.resolve('lyra/lib');
  // Ensure lyra folder
  fs.ensureDirSync(lyraAPIPath);
  fs.ensureDirSync(libPath);
  // Gather all of our file names as a lookup
  const lyraFiles = gatherFilesAsObject(lyraAPIPath, {});
  const libFiles = gatherFilesAsObject(libPath, {});
  // Find our adds and removals for our file system
  const toAdd = diff.addedDiff(lyraFiles, libFiles);
  const toRemove = diff.addedDiff(libFiles, lyraFiles);
  // Get the full file paths to files that are to be added and removed
  // Convert the add paths to lyra file extensions
  const toAddPaths = aggregateFilePaths(lyraAPIPath, toAdd, []).map(filePath => {
    const base = path.basename(filePath).split('.')[0];
    const extension = path.extname(filePath);
    return path.resolve(path.dirname(filePath), `${base}${extension}`);
  }).filter(validSyncFile);

  const toRemovePaths = aggregateFilePaths(
    lyraAPIPath,
    toRemove,
    []
  ).filter(validSyncFile);

  // Ask the User if they want to proceed
  willSync = await new Select({
    name: 'willInitFiles',
    message: `
      This will perform the following operations to sync the lib folder with
      the lyra api folder.
      WARNING: This action overrides any existing files and can not be undone.
      The following files will be ADDED:\n
      ${toAddPaths.join('\n      ')}\n
      The following files will be REMOVED:\n
      ${toRemovePaths.join('\n      ')}\n
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willSync === 'No') {
    console.log(`The sync operation was cancelled.`);
    return;
  }

  // Confirmation of choice
  willSync = await new Select({
    name: 'willInitFiles',
    message: `ARE YOU SURE?`,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willSync === 'No') {
    console.log(`The sync operation was cancelled.`);
    return;
  }

  console.log('Syncing files...');

  // Add the new files
  toAddPaths.forEach(path => {
    newAPIFile(path);
  });

  // Remove the old files
  toRemovePaths.forEach(path => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });
}

module.exports = run;
