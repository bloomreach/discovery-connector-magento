const { AutoComplete, prompt } = require('enquirer');
const fs = require('fs');
const path = require('path');
const { pascalCase, paramCase } = require('change-case');
const shell = require("shelljs");

/**
 * Recursively find all files in a directory.
 */
function getAllFiles(dirPath, out) {
  const files = fs.readdirSync(dirPath);
  let arrayOfFiles = out || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

/**
 * Ensure this project matches the requirements for generating a new component.
 */
async function checkStructure() {
  const componentsPath = path.resolve('lib/components');
  const storiesPath = path.resolve('lib/stories');
  const storiesComponents = path.resolve(storiesPath, 'components');
  const storiesData = path.resolve(storiesPath, 'data');
  let fail = "";

  if (!fs.existsSync(componentsPath) || !fs.statSync(componentsPath).isDirectory()) {
    fail += `${componentsPath} not found or is not a directory\n`;
  }

  if (!fs.existsSync(storiesPath) || !fs.statSync(storiesPath).isDirectory()) {
    fail += `${storiesPath} not found or is not a directory\n`;
  }

  if (!fs.existsSync(storiesComponents) || !fs.statSync(storiesComponents).isDirectory()) {
    fail += `${storiesComponents} not found or is not a directory\n`;
  }

  if (!fs.existsSync(storiesData) || !fs.statSync(storiesData).isDirectory()) {
    fail += `${storiesData} not found or is not a directory\n`;
  }

  if (fail) {
    console.warn(fail);
    process.exit(1);
  }

  const out = {
    componentsPath,
    storiesComponents,
    storiesData
  };

  return out;
}

/**
 * This prompts the user for the component name and directory of choice.
 */
async function requestName(paths, name) {
  // If the name of the desired component was not provided, let's provide an
  // automated curated list to pick from
  if (!name) {
    const allFiles = getAllFiles(paths.componentsPath);
    const checkFiles = new Set();
    allFiles.forEach(f => checkFiles.add(
      path.basename(f)
      .split('.')
      .slice(0, -1)
      .join('.')
    ));

    const selectedName = await new AutoComplete({
      name: 'selectedName',
      message: 'Type a name for the component:',
      limit: 10,
      choices: Array.from(checkFiles.values()),
      result: val => pascalCase(val.split(' ').map(s => pascalCase(s)).join(""))
    }).run();

    name = selectedName;
  }

  name = pascalCase(name.split(' ').map(s => pascalCase(s)).join(""));

  // Search for this component name within the components folder to find
  // component with matching name
  const allFiles = getAllFiles(paths.componentsPath);
  const checkFiles = new Map();
  allFiles.forEach(f => checkFiles.set(path.basename(f), f));
  const componentPath = checkFiles.get(`${name}.tsx`) || checkFiles.get(`${paramCase(name)}.tsx`);
  let selectedDirectory = "";

  // See if we have a match with a component name
  if (componentPath) {
    selectedDirectory = path.basename(path.dirname(path.dirname(componentPath)));
  }

  else {
    console.warn(`Unable to find a component with name ${name}.tsx or ${paramCase(name)}.tsx`);
    process.exit(0);
  }

  return {
    directory: selectedDirectory,
    name
  };
}

/**
 * Opens the file fragments
 */
async function openFragments(paths, selections) {
  const kebabName = paramCase(selections.name);

  // Open file fragments
  try {
    // Get the path to all of the related files
    const componentPath = path.resolve(paths.componentsPath, selections.directory, kebabName, `${kebabName}.tsx`);
    const scssPath = path.resolve(paths.componentsPath, selections.directory, kebabName, `${kebabName}.scss`);
    const storyPath = path.resolve(paths.storiesComponents, selections.directory, `${kebabName}.stories.tsx`);
    const propsPath = path.resolve(paths.storiesData, selections.directory, `${kebabName}-props.tsx`);

    // Open the written files for review
    openFile([componentPath, scssPath, storyPath, propsPath]);
  }

  catch (err) {
    console.warn("Could not open all file fragments:\n", err);
    process.exit(1);
  }
}

/**
 * This opens the specified file at the path in the editor for immediate review
 */
async function openFile(path) {
  if (Array.isArray(path)) {
    shell.exec(`code -r ${path.join(' ')}`, { async: true });
  }

  else if (fs.existsSync(path) && !fs.statSync(path).isDirectory()) {
    // Use VS Code as our editor for opening the file
    shell.exec(`code -r ${path}`, { async: true });
  }
}

/**
 * This command will establish that this is a storybook based project with a
 * certain layout. Then, this will create and update all of the fragments needed
 * to add a new component to the library project, which includes:
 *
 * - component.tsx
 * - component.scss
 * - component.stories.tsx (for testing)
 * - component-props.tsx (for testing)
 * - update nearest barrel file to export the new component
 * - open all of the new fragments in the current editor
 */
async function run(name) {
  // Validate the project structure and provide the paths that have been
  // determined valid.
  const paths = await checkStructure();
  // Requests the directory and the component name from the user
  const selections = await requestName(paths, name);
  // Perform the file creation by utilizing the templates
  await openFragments(paths, selections);
}

module.exports = run;
