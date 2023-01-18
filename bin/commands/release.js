const { /** removeSync, ensureDirSync, */ existsSync, writeJSONSync, readJSONSync } = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

// const releaseLibrary = require('../lib/library/release-library');
const targetProjectRepo = require('../lib/target-project/target-project-repo');
const targetProjectVersion = require('../lib/target-project/target-project-version');
// const wait = require('../lib/util/wait');
const colors = require('colors');

/** This is the required remote name that must be present for the release script to work */
const ENSURE_REMOTE = 'origin';

/**
 * This method checks all of the package json settings and ensures the repositories listed are valid for use within
 * this context.
 */
async function validateRepository() {
  const projectRepo = await targetProjectRepo();
  const ENSURE_REMOTE_PROJECT = projectRepo.url;

  if (!projectRepo || !(projectRepo.type !== 'gitlab' || projectRepo.type !== 'git' || projectRepo.type !== 'bitbucket' || projectRepo.type !== 'stash')) {
    console.log(`
      You MUST have a repository specified in your package json to use the
      release script. It must be of 'type: git' and have a valid ssh url to
      your git repo.

      Additionally, you MUST have a remote configured for your project of
      'origin' that matches the repo url listed in your package.json.

      Thus: "git remote -v" SHOULD output a line with
      origin <url in your package json repository field> (push)
    `);
    process.exit(1);
  }

  // We check our remote to ensure we have a projected with expected values
  const remoteListProcess = shell.exec('git remote -v');

  if (remoteListProcess.code !== 0) {
    console.log('Could not list remotes for the git project.');
    process.exit(1);
  }

  const remotes = remoteListProcess.stdout.toString().split(/\r?\n/g);

  const foundRemote = remotes.find(row =>
    row.indexOf(ENSURE_REMOTE) >= 0 && row.indexOf(ENSURE_REMOTE_PROJECT) >= 0
  );

  if (!foundRemote) {
    console.log(
      'Could not match package json repository to an origin remote in git CLI',
      ENSURE_REMOTE,
      ENSURE_REMOTE_PROJECT
    );
    process.exit(1);
  }

  // Now check to make sure the repo specified exists in git and is available to the user
  const checkRemoteAccessProcess = shell.exec(`git ls-remote ${ENSURE_REMOTE_PROJECT}`);

  if (checkRemoteAccessProcess.code !== 0) {
    console.log(`
      You do not seem to have access to the repo listed in the package json of
      this project. Please ensure you have write access to the repo:
      ${ENSURE_REMOTE_PROJECT}
      and then try to run the release again.
    `);
    process.exit(1);
  }
}

/**
 * Makes sure we are on the release branch and completely updated with the contents of dev.
 */
async function checkoutRelease(alternate) {
  console.log("Checking out the release branch...");

  // Make sure we're on a release branch that matches dev
  if (shell.exec('git checkout release').code !== 0) {
    if (shell.exec('git checkout -b release').code !== 0) {
      console.log('Could not switch to the release branch. Make sure the branch exists locally.');
      process.exit(1);
    }
  }

  // Make sure we have the latest from the remote
  if (shell.exec('git fetch --all').code !== 0) {
    console.log('Could not fetch from remote servers.');
    process.exit(1);
  }

  console.log("Resetting the release branch to the latest contents in dev...");
  // Make sure we are exactly what is in dev
  if (shell.exec(`git reset --hard ${ENSURE_REMOTE}/dev${alternate ? `-${alternate}` : ""}`).code !== 0) {
    console.log(`Could not reset branch to dev${alternate ? `-${alternate}` : ""}`);
    process.exit(1);
  }
}

/**
 * For certain operations we have to run typescript transpilation directly instead of using the webpack bundler.
 * We always need the declaration files to be generated, and sometimes, we let typescript do all of the transpiling
 * instead of webpack.
 */
// async function runTypescript(bundleMode) {
//   let emitDeclaration = '';

//   // See if the bundle mode requires transpilation or only declaration
//   switch (bundleMode) {
//     case 'bundle': {
//       emitDeclaration = "--emitDeclarationOnly";
//       break;
//     }

//     case 'no-bundle':
//     default:
//       break;
//   }

//   if (!existsSync(path.resolve('lib'))) {
//     console.warn('Skipping ts declaration file generation as no library source code is present');
//     return;
//   }

//   // Build declaration files for the library only
//   const tsConfig = readJSONSync(path.resolve('tsconfig.json'));
//   tsConfig.include = ["lib", "dts"];
//   tsConfig.exclude = tsConfig.exclude || [];
//   tsConfig.exclude.push("lib/stories");
//   writeJSONSync(path.resolve('tsconfig.temp.json'), tsConfig);
//   await wait(500);

//   if (
//     shell.exec(
//       `tsc -d ${emitDeclaration} --outDir ${path.resolve('dist/lib')} --project ${path.resolve('tsconfig.temp.json')}`
//     ).code !== 0
//   ) {
//     console.log('Failed to compile type declarations');
//     removeSync(path.resolve('tsconfig.temp.json'));
//     process.exit(1);
//   }

//   removeSync(path.resolve('tsconfig.temp.json'));
// }

/**
 * This performs all bundling procedures and set up needed to bundle the project.
 */
// async function bundleProject(bundleMode) {
//   // Check to see if we should be bundling or not
//   switch (bundleMode) {
//     case 'no-bundle': return;

//     case 'bundle':
//     default:
//       break;
//   }

//   await releaseLibrary();
// }

/**
 * This clears out the distribution folder so no lingering irrelevant fragments exists.
 */
// async function clearPreviousDistribution() {
//   try {
//     removeSync(path.resolve('dist'));
//   }
//   catch (err) {
//     console.log('No dist folder to clean out.');
//   }

//   ensureDirSync(path.resolve('dist'));
// }

/**
 * This copies all necessary elements from the project into the distribution
 */
// async function copyAndCleanFragments() {
//   // Clean out the compiled test file typings
//   try {
//     removeSync(path.resolve('dist/test'));
//   }
//   catch (err) {
//     console.log('No test folder to clean out');
//   }

//   // Clean out unit-tests
//   try {
//     removeSync(path.resolve('dist/unit-test'));
//   }
//   catch (err) {
//     console.log('No unit-test folder to clean out');
//   }
// }

/**
 * Determines the last release type based on the contents placed within the
 * release notes file.
 */
 function getReleaseType() {
  try {
    const notes = fs.readFileSync(path.resolve('RELEASE_NOTES.md'), 'utf8');
    const groups = notes
      .toLowerCase()
      .split('\n')
      .map(line => (line.match(/## (\w+)/) || [])[1])
      .filter(Boolean);
    if (groups.includes('breaking')) return 'major';
    if (groups.includes('added')) return 'minor';
    return 'patch';
  }

  catch(err) {
    console.error("Could not determine release type after release was created");
    process.exit(1);
  }
}

/**
 * Update our release notes and determine what our next version is going to be
 * based on commit messages.
 */
async function updateVersion(alternate) {
  // Get our current version so we can ensure our version changed.
  const currentVersion = await targetProjectVersion();

  // Ensure all fragments are going to be included in the commit
  if (shell.exec('git add -A').code !== 0) {
    console.log('Could not ensure all fragments are added for the next commit.');
    process.exit(1);
  }

  // Have this execute the release-notes script
  const releaseNotes = require('./release-notes.js');
  releaseNotes({
    file: "RELEASE_NOTES.md",
    updatePackage: true,
  });

  // Get the version runner should have updated to
  const newVersion = await targetProjectVersion();

  // If our version has not changed, then there were no commits with release notes
  if (currentVersion === newVersion) {
    console.log(`
      The release script did not detect any changes for a release. If you find
      this to be in error or you want to force a new release. Make some commits
      with proper release note formatted messages to trigger a release.
    `);
    process.exit(1);
  }

  if (alternate) {
    if (getReleaseType() !== "patch") {
      console.error(`
        Cannot create a release for an alternate branch that is not a simple
        patch. Features and breaking changes can ONLY be made on the main branch of
        development.
      `);
      process.exit(1);
    }
  }

  return newVersion
}

/**
 * This generates a tag for the given release
 */
async function updateTag(version) {
  // Tag the commit with the version number
  if (shell.exec(`git tag -a ${version} -m "Release ${version}"`).code !== 0) {
    console.log('Could not make tag for git commit');
    process.exit(1);
  }
}

/**
 * This performs all actions to pushing the generated results to the remote repository
 */
async function pushToRemote(version) {
  // Push the commit to remote release branch
  if (shell.exec(`git push ${ENSURE_REMOTE} -f release`).code !== 0) {
    console.log(`Could not push release commit to ${ENSURE_REMOTE}`);
    process.exit(1);
  }

  // Push the tag to remote
  if (shell.exec(`git push ${ENSURE_REMOTE} ${version}`).code !== 0) {
    console.log('Could not push tag to the remote repository');
    process.exit(1);
  }
}

/**
 * This performs all of the build actions to generate all fragments the project will generate for distributions
 * and then will push those fragments into the repo.
 */
 async function buildAndPush(bundleMode, alternate, testMode) {
  // Process and set environment variables
  const TEST = process.env.TEST || testMode;
  process.env.NODE_ENV = 'production';

  if (TEST) {
    console.log('Building files without any git changes');
  }

  else {
    // Make sure we can make calls to the repo
    await validateRepository();
    // Move our git context to the release branch
    checkoutRelease(alternate);
  }

  // Delete any files in the dist folder so we have a clean build with no chances of caching or keeping
  // no longer relevant files.
  // await clearPreviousDistribution();
  // Perform any typescript specific actions
  // await runTypescript(bundleMode);
  // Build the monolithic distribution
  // await bundleProject(bundleMode);
  // Copy and delete any fragments in the dist folder that is necessary
  // await copyAndCleanFragments();

  if (!TEST) {
    // Get the new version this release is going to become.
    const version = await updateVersion();
    // Tag the release commit with the latest version
    updateTag(version);
    // Push everything we have updated with git to the remote repo
    pushToRemote(version);
  }
}

/**
 * Entry method for the release process
 */
 async function run(mode, alternate, options) {
  console.log('Executing release script');
  buildAndPush(mode, alternate, options.debug);
}

module.exports = run;
