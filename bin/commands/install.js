const { AutoComplete, Select, prompt } = require('enquirer');
const deepmerge = require('deepmerge');
const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const lyraProjectName = require('../lib/lyra-project/lyra-project-name');
const targetProjectRepo = require('../lib/target-project/target-project-repo');

/**
 * This ensures the correct script names
 */
async function updatePackageScripts(json) {
  const projectName = await lyraProjectName();
  json.scripts = json.scripts || {};
  json.scripts.dev = `${projectName} dev`;
  json.scripts.release = `${projectName} release`;
  json.scripts.start = `${projectName} start`;
  json.scripts['unit-test'] = `${projectName} unit-test`;
  json.scripts['unit-test-dev'] = `${projectName} unit-test-dev`;
  json.scripts['unit-test-debug'] = `${projectName} unit-test-debug`;
  json.scripts.sync = `${projectName} sync`;
}

/**
 * This ensures all dynamic dev dependencies are written and updated in the package json
 */
async function updatePackageDevDependencies(options) {
  const targetPackage = fs.readJSONSync(path.resolve('package.json'));
  const hasWebApp = fs.existsSync(path.resolve('app'));
  let branch = '';

  if (options.debug) {
    branch = `#${options.debug}`;
  }

  // If a web app is available, we need lyra present to have the start up scripts needed to execute the server smoothely
  // and easily.
  if (hasWebApp) {
    // Our inclusion of lyra in the dev dependencies is essential. The name of lyra is based
    // on the package of this project so we must ensure it matches everytime.
    targetPackage.dependencies = targetPackage.devDependencies || {};
    targetPackage.dependencies[await lyraProjectName()] = `github:vega-studio/lyra${branch}`;
  }

  // For library projects, lyra should not be required for applications that use the generated project, thus lyra will
  // simply be a dev dep.
  else {
    // Our inclusion of lyra in the dev dependencies is essential. The name of lyra is based
    // on the package of this project so we must ensure it matches everytime.
    targetPackage.devDependencies = targetPackage.devDependencies || {};
    targetPackage.devDependencies[await lyraProjectName()] = `github:vega-studio/lyra${branch}`;
  }

  fs.writeJSONSync(path.resolve('package.json'), targetPackage);
}

/**
 * This performs the necessary tasks to generate the default package settings for the project that is being initialized.
 */
async function createPackage(installPath) {
  console.log(`
    \n
    -------------PACKAGE JSON-------------
    \n
  `);

  const willInitPackage = await new Select({
    name: 'willInitPackage',
    message: `Would you like to modify your project package.json to the Lyra's defaults?`,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitPackage === 'No') {
    console.log(`
      The default package setup was cancelled.
    `);
    return;
  }

  // Get Lyra's project's default package json file and the potentially existing package json that is
  // located at the installation path. We then apply the default package over the existing package
  const basePackage = fs.readJSONSync(path.resolve(__dirname, '../../install/package.json'));
  const currentPackagePath = path.resolve(installPath, 'package.json');
  const currentPackage = fs.existsSync(currentPackagePath) ? fs.readJSONSync(currentPackagePath) : {};
  // Override the existing package with the defaults
  const result = deepmerge(currentPackage, basePackage);

  console.log(`
    \n
    Checking the package for other settings that should be set.
    Lyra deems some fields necessary to make your package fully
    compliant. You will be prompted to provide the additional information if
    anything is found to be missing.
    \n
  `);

  // Ensure the package has a project name
  if (!result.name) {
    const { projectName } = await prompt({
      type: 'input',
      name: 'projectName',
      message: 'Please name the project:',
      initial: path.basename(installPath)
    });

    result.name = projectName;
  }

  // Ensure author information
  if (!result.author) {
    console.log(`
      \n
      Author information MUST be specified.
      \n
    `);
    const { authorName, authorEmail, authorUrl } = await prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email:'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:'
      },
    ]);

    result.author = result.author || {};
    result.author.name = authorName;
    result.author.email = authorEmail;
    result.author.url = authorUrl;
  }

  // Ensure repository
  if (!result.repository) {
    console.log(`
      \n
      Repository information MUST be specified.
      \n
    `);
    const { repoType, repoUrl } = await prompt([
      {
        type: 'input',
        name: 'repoType',
        message: 'Insert the type of repository this code base will be uploaded to.',
        initial: 'git',
      },
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Insert the URL to the repository.',
        initial: `git@github.com:${result.author.name}/${path.basename(installPath)}.git`,
      }
    ]);

    result.repository = result.repository || {};
    result.repository.type = repoType;
    result.repository.url = repoUrl;
  }

  // Ensure license
  if (!result.license) {
    console.log(`
      \n
      No license was found. Please select a default license.
      For more information on the pre-populated licenses please see:
      https://tldrlegal.com/licenses/tags/open%20source
      \n
    `);
    const license = await new AutoComplete({
      name: 'license',
      message: `Start typing to find a license that works for you.`,
      limit: 10,
      choices: [
        'MIT', 'MIT License',
        'Apache License 2.0', 'Apache2.0',
        'GNU General Public License v3', 'GPL-3',
        'BSD 3-Clause License', 'GNU Lesser General Public License v3',
        'LGPL-3.0', 'GNU General Public License v2.0',
        'GPL-2.0', 'BSD 2-Clause License',
        'FreeBSD', 'Mozilla Public License 2.0',
        'MPL-2.0', 'Microsoft Public License',
        'Ms-PL', 'Creative Commons Attribution 3.0 Unported',
        'CC-BY', 'Eclipse Public License 1.0',
        'EPL-1.0', 'Common Development and Distribution License',
        'CDDL-1.0', 'ISC License',
        'Artistic License 2.0', 'Artistic-2.0',
        'Mozilla Public License 1.0', 'MPL-1.0',
        'Boost Software License 1.0', 'BSL-1.0',
        'Mozilla Public License 1.1', 'MPL-1.1',
        'Academic Free License 3.0', 'AFL',
        'Apple Public Source License 2.0', 'APSL',
        'Common Public License 1.0', 'CPL-1.0',
        'Fair License', 'Fair',
        'IBM Public License 1.0', 'IPL',
        '4-Clause BSD', 'Universal Permissive License 1.0',
        'UPL-1.0', 'The JSON License',
        'Attribution Assurance License', 'AAL',
        'Free Public License 1.0.0', 'Educational Community License, Version 2.0',
        'ECL-2.0', 'IPA Font License',
        'IPA', 'Adaptive Public License 1.0',
        'APL-1.0', 'Very Simple Public License',
        'VSPL', 'MiTTY',
        'Creative Commons Attribution-NonCommercial 2.0 Generic', 'CC BY-NC 2.0',
        'Mts', 'Sendmail License',
        'hx711_SPI', 'Zed License',
        'XSkat License', 'Jared M.F. Open Source Public License'
      ],
      initial: 'MIT',
    }).run();

    result.license = license;
  }

  // Establish script commands
  await updatePackageScripts(result);
  // Write the newly generated package
  fs.writeJSONSync(currentPackagePath, result);

  console.log(`
    \n
    The package.json has been successfully updated!
    \n\n
  `);
}

/**
 * This method will generate the default file structure for your project to begin development.
 */
async function createCommonFiles(installPath) {
  console.log(`
    \n
    -------------Common Files-------------
    \n
  `);

  // Ask if user wants to continue
  let willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      Would you like to modify your file structure to include all expected
      default project needs to create a project based on Lyra?
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The file structure setup was cancelled.
      This may cause Lyra to not operate correctly.
    `);
    return;
  }

  // We will be copying the files from our initial file structure for libraries found within the 'install'
  // folder to the new project's file system.
  const initFileStructurePath = path.resolve(__dirname, '../../install/init-common');
  const toCopy = fs.readdirSync(initFileStructurePath);

  // Double check. Ask one last time.
  willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      ARE YOU SURE?
      WARNING: This action overrides any existing files and can not be undone.
      The following files will be written (all .bak files will have the .bak
      removed):\n
      ${toCopy.map(file => path.resolve(installPath, file)).join('\n      ')}
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The file structure setup was cancelled.
      This may cause Lyra to not operate correctly.
    `);
    return;
  }

  // Perform the copy operation
  toCopy.forEach(file => {
    let destName = file;

    // We have files that have the .bak extension added. This is to prevent the files from affecting the project as it
    // is installed into the node_modules folder. Upon writing the file, the .bak extension should be removed to allow
    // the file to behave appropriately.
    if (destName.indexOf('.bak') > 0) {
      destName = destName.replace('.bak', '');
    }

    console.log(`      Writing default file or directory: ${path.resolve(installPath, destName)}`);
    fs.copySync(path.resolve(initFileStructurePath, file), path.resolve(installPath, destName));
  });
}

/**
 * This method will generate the default file structure for your project to begin development.
 */
async function createLibraryFiles(installPath) {
  console.log(`
    \n
    -------------Library Project-------------
    \n
  `);

  // Ask if user wants to continue
  let willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      Would you like to modify your file structure to include all expected
      default project needs to create a library type project for Lyra?
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The default library project structure setup was cancelled.
      This may cause Lyra to not operate correctly if you expect to have a
      library distribution be available for your project.
    `);
    return;
  }

  // We will be copying the files from our initial file structure for libraries found within the 'install'
  // folder to the new project's file system.
  const initFileStructurePath = path.resolve(__dirname, '../../install/init-library');
  const toCopy = fs.readdirSync(initFileStructurePath);

  // Double check. Ask one last time.
  willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      ARE YOU SURE?
      WARNING: This action overrides any existing files and can not be undone.
      The following files will be written (all .bak files will have the .bak
      removed):\n
      ${toCopy.map(file => path.resolve(installPath, file)).join('\n      ')}
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The default library project structure setup was cancelled.
      This may cause Lyra to not operate correctly if you expect to have a
      library distribution be available for your project.
    `);
    return;
  }

  // Perform the copy operation
  toCopy.forEach(file => {
    let destName = file;

    // We have files that have the .bak extension added. This is to prevent the files from affecting the project as it
    // is installed into the node_modules folder. Upon writing the file, the .bak extension should be removed to allow
    // the file to behave appropriately.
    if (destName.indexOf('.bak') > 0) {
      destName = destName.replace('.bak', '');
    }

    console.log(`      Writing default file or directory: ${path.resolve(installPath, destName)}`);
    fs.copySync(path.resolve(initFileStructurePath, file), path.resolve(installPath, destName));
  });
}

/**
 * Prompts and performs creation of a web server structure within the project. The web server project will be
 * considered tandem to the library structure.
 */
async function createWebAppFiles(installPath) {
  console.log(`
    \n
    -------------Web App-------------
    \n
  `);

  // Ask if user wants to continue
  let willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      Would you like to modify your file structure to include all expected
      default project needs for a web app for Lyra?
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The default web app structure setup was cancelled.
      This may cause Lyra to not operate correctly if you expect lyra to support
      a web app distribution and developer environment.
    `);
    return;
  }

  // We will be copying the files from our initial file structure for libraries found within the 'install'
  // folder to the new project's file system.
  const initFileStructurePath = path.resolve(__dirname, '../../install/init-web-app');
  const toCopy = fs.readdirSync(initFileStructurePath);

  // Double check. Ask one last time.
  willInitFiles = await new Select({
    name: 'willInitFiles',
    message: `
      ARE YOU SURE?
      WARNING: This action overrides any existing files and can not be undone.
      The following files will be written (all .bak files will have the .bak removed):\n
      ${toCopy.map(file => path.resolve(installPath, file)).join('\n      ')}
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitFiles === 'No') {
    console.log(`
      The default web app structure setup was cancelled.
      This may cause Lyra to not operate correctly if you expect lyra to support
      a web app distribution and developer environment.
    `);
    return;
  }

  // Perform the copy operation
  toCopy.forEach(file => {
    let destName = file;

    // We have files that have the .bak extension added. This is to prevent the files from affecting the project as it
    // is installed into the node_modules folder. Upon writing the file, the .bak extension should be removed to allow
    // the file to behave appropriately.
    if (destName.indexOf('.bak') > 0) {
      destName = destName.replace('.bak', '');
    }

    console.log(`      Writing default file or directory: ${path.resolve(installPath, destName)}`);
    fs.copySync(path.resolve(initFileStructurePath, file), path.resolve(installPath, destName));
  });
}

/**
 * After the installation of Lyra's fragments is complete, we need to execute any npm commands necessary to
 * ensure the environment is ready to roll.
 */
async function executeNPMCommands() {
  console.log(`
    \n\n
    The System is now running 'npm install' to ensure your project is ready to use.
    \n\n
  `);
  shell.exec('npm --color true i');
}

/**
 * DEBUGGING ONLY:
 * This is a debugging method that erases a project's package.json back to an empty package, thus allowing Lyra
 * to run on an empty package and test everything from the ground up.
 */
async function resetPackage(installPath) {
  const willResetPackage = await new Select({
    name: 'willResetPackage',
    message: `Are you sure you want to erase your current package.json?`,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willResetPackage === 'No') {
    console.log(`
      The reset package process was cancelled.
    `);
    return;
  }

  // Get the reset package json and apply it to the install location
  const basePackage = fs.readJSONSync(path.resolve(__dirname, '../../install/reset-package.json'));
  const currentPackagePath = path.resolve(installPath, 'package.json');
  fs.writeJSONSync(currentPackagePath, basePackage);
}

/**
 * DEBUGGING ONLY:
 * This is a debugging method that erases the existing files in the target directory except the package.json and the
 * node_modules folder. This is ONLY for debugging Lyra and is used to speed up tests.
 */
async function resetFileStructure(installPath) {
  let willResetFiles = await new Select({
    name: 'willResetFiles',
    message: `Are you sure you want to erase your current files in your project?`,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willResetFiles === 'No') {
    console.log(`
      The reset file structure process was cancelled.
    `);
    return;
  }

  // Retrieve the install path directory contents and process each one to determine if it should be removed or not
  const files = fs.readdirSync(installPath).filter(file => {
    return file !== 'node_modules' && file !== 'package.json';
  });

  // No files to remove? Don't do anything.
  if (files.length === 0) {
    console.log(`
      No files were detected to be removed
    `);
    return;
  }

  // Final warning with expected removals to be listed
  willResetFiles = await new Select({
    name: 'willResetFiles',
    message: `
      ARE YOU SURE?! (This can not be undone)
      The following files will be deleted:
      ${files.map(file => path.resolve(installPath, file)).join('\n      ')}
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willResetFiles === 'No') {
    console.log(`
      The reset file structure process was cancelled.
    `);
    return;
  }

  // Perform the removal. And pray the user chose well.
  files.forEach(file => {
    const filePath = path.resolve(installPath, file);
    fs.removeSync(filePath);
  });
}

/**
 * This does the process needed to establish a github repository based on the package json's repository settings.
 * This will make sure the repository is accessible via the user's context and initialize the git repo and set up
 * the initial origin remote to work with.
 */
async function startGitRepo() {
  const willInitGit = await new Select({
    name: 'willInitGit',
    message: `
      \n
      Do you want Lyra to initialize git for this project?
      This will set your remote 'origin' and ensure git has been initialized.
      \n
    `,
    choices: ['Yes', 'No'],
    initial: 'Yes',
  }).run();

  if (willInitGit === 'No') {
    console.log(`
      \n
      The start git process was cancelled.
      You should ensure you have git established for your project.
      The Lyra release script requires your remote 'origin' to match the
      repository in your package json.
      \n
    `);
    return;
  }

  const gitFetchProcess = shell.exec('git fetch');

  // If this fails, then this is not a valid repo and should be initialized
  if (gitFetchProcess.code !== 0) {
    console.log(`
      Detected git is not initialized for this project. Initializing git...
    `);

    if (shell.exec('git init').code !== 0) {
      console.log(`
        Could not initialize git for this project
      `);
      return;
    }
  }

  // Next look at the available remotes for the git project. We need to make sure the origin remote matches the
  // target projects repository information
  const projectRepo = await targetProjectRepo();
  const ENSURE_REMOTE = 'origin';
  const ENSURE_REMOTE_PROJECT = projectRepo.url;

  console.log(`
    Checking if remote configuration matches package.json repository...
  `);
  const remoteListProcess = shell.exec('git remote -v');

  if (remoteListProcess.code !== 0) {
    console.log(`
      Could not list remotes for the git project.
    `);
    process.exit(1);
  }

  const remotes = remoteListProcess.stdout.toString().split(/\r?\n/g);

  const foundRemote = remotes.find(row =>
    row.indexOf(ENSURE_REMOTE) >= 0 && row.indexOf(ENSURE_REMOTE_PROJECT) >= 0
  );

  // If the remote we need does not exist, let's create it by creating the origin remote or override the existing
  // origin remote
  if (!foundRemote) {
    const foundOrigin = remotes.find(row => row.indexOf(ENSURE_REMOTE) >= 0);

    if (foundOrigin) {
      console.log(`
        Removing old existing remote "origin"...
      `);

      if (shell.exec(`git remove rm ${ENSURE_REMOTE}`).code !== 0) {
        console.log(`
          Could not remove existing remote to replace it with the correct remote
        `);
        return;
      }
    }

    else {
      console.log(`
        Creating new remote "origin" that matches package.json...
      `);

      if (shell.exec(`git remote add ${ENSURE_REMOTE} ${ENSURE_REMOTE_PROJECT}`).code !== 0) {
        console.log(`
          Could not add the new remote for the project to match the package json repository.
        `);
      }
    }
  }

  else {
    console.log(`
      Proper remote configuration found!
    `);
  }

  console.log(`
    Checking if current user has access to the specified remote repository...
  `);

  // Now we test to see if the user has access to the repo
  const checkRemoteAccessProcess = shell.exec(`git ls-remote ${ENSURE_REMOTE_PROJECT}`);

  if (checkRemoteAccessProcess.code !== 0) {
    console.log(`
      You do not seem to have access to the repo listed in the package json of
      this project. Please ensure you have write access to the repo:
      ${ENSURE_REMOTE_PROJECT}
    `);
    process.exit(1);
  }

  else {
    console.log(`
      You have proper access to this repo!
    `);
  }
}

/**
 * Entry method for executing scripts.
 */
async function run(installPath, doResetPackage, doFileReset, options) {
  if (path.resolve('package.json') === path.resolve(__dirname, '../../package.json')) {
    console.log('Lyra should not perform an install process on itself due to its destructive nature');
    return;
  }

  if (doFileReset) {
    await resetFileStructure(installPath);
    return;
  }

  if (doResetPackage) {
    await resetPackage(installPath);
    return;
  }

  console.log(`
    \n\n
    STARTING LYRA NEW PORJECT INSTALLATION IN: ${installPath}
    \n\n
  `);

  await createPackage(installPath);
  await createCommonFiles(installPath);
  await createLibraryFiles(installPath);
  await createWebAppFiles(installPath);
  await updatePackageDevDependencies(options);
  await executeNPMCommands();
  await startGitRepo();

  console.log(`
    \n\n
    Lyra has completed your project initialization!
    To start developing simply:

      npm run dev

    And write your code in test/ lib/ or app/
    \n\n
  `);
}

module.exports = run;
