const { AutoComplete, prompt } = require('enquirer');
const fs = require('fs');
const path = require('path');
const { pascalCase, paramCase } = require('change-case');
const template = require("../lib/util/template");
const wait = require("../lib/util/wait");
const shell = require("shelljs");

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

  console.log("Fragments targetting folders:", out);

  return out;
}

/**
 * This prompts the user for the component name and directory of choice.
 */
async function requestName(paths, name) {
  const files = fs.readdirSync(paths.componentsPath);
  const directorySuggestions = [];

  files.forEach(file => {
    const filePath = path.resolve(paths.componentsPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      directorySuggestions.push(file);
    }
  });

  const selectedDirectory = await new AutoComplete({
    name: 'selectedDirectory',
    message: 'Start typing to select the directory to add your new component:',
    limit: 10,
    choices: directorySuggestions
  }).run();

  if (!name) {
    const { selectedName } = await prompt({
      type: 'input',
      name: 'selectedName',
      message: 'Type a name for the component:',
      initial: '',
      result: val => pascalCase(val.split(' ').map(s => pascalCase(s)).join(""))
    });

    name = selectedName;
  }

  name = pascalCase(name.split(' ').map(s => pascalCase(s)).join(""));

  return {
    directory: selectedDirectory,
    name
  };
}

/**
 * Writes the file to the specified destination and provides override file
 * checks and prompts
 */
async function writeFile(path, file) {
  console.warn("Creating file:", path);

  if (fs.existsSync(path)) {
    const answer = await new AutoComplete({
      name: 'answer',
      message: `File already exists. Replace contents with new component default?`,
      limit: 10,
      initial: "Yes",
      choices: ["Yes", "No"]
    }).run();

    if (answer !== "Yes") {
      console.warn("Skipped file");
      return;
    }
  }
  // Write the component template files
  try {
    fs.writeFileSync(path, file, { encoding: 'utf-8' });
  }

  catch (err) {
    throw new Error(`Could not create file ${path}`);
  }

  console.warn("Created file");
  return path;
}

/**
 * Ensures a directory exists. DOes not attempt anything if already exists to
 * prevent errors.
 */
async function mkDir(path) {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
}

/**
 * Generates the file fragments
 */
async function generateFragments(paths, selections) {
  const pascalName = pascalCase(selections.name);
  const kebabName = paramCase(selections.name);
  const kebabDirectory = paramCase(selections.directory);
  const templatesPath = path.resolve(__dirname, "../lib/new-component");

  if (!fs.existsSync(templatesPath)) {
    throw new Error(`${templatesPath} was not found`);
  }

  if (
    !fs.existsSync(path.resolve(templatesPath, "component.template")) ||
    !fs.existsSync(path.resolve(templatesPath, "props.template")) ||
    !fs.existsSync(path.resolve(templatesPath, "scss.template")) ||
    !fs.existsSync(path.resolve(templatesPath, "story.template"))
  ) {
    throw new Error(`All templates within ${templatesPath} were not found`);
  }

  // This maps all of the terms in the templates to the values they should be
  // based on the innput from the user.
  const options = {
    name: pascalName,
    "name-kebab": kebabName,
    directory: kebabDirectory
  }

  // Generate all of the contents of our files by replacing the relevant terms
  const componentTemplate = template({
    template: fs.readFileSync(path.resolve(templatesPath, "component.template"), { encoding: 'utf-8' }),
    options: options,
  });

  const propsTemplate = template({
    template: fs.readFileSync(path.resolve(templatesPath, "props.template"), { encoding: 'utf-8' }),
    options: options,
  });

  const scssTemplate = template({
    template: fs.readFileSync(path.resolve(templatesPath, "scss.template"), { encoding: 'utf-8' }),
    options: options,
  });

  const storyTemplate = template({
    template: fs.readFileSync(path.resolve(templatesPath, "story.template"), { encoding: 'utf-8' }),
    options: options,
  });

  // Ensure all of the options within each template has been resolved
  if (
    componentTemplate.unresolvedTemplateOptions.size > 0 ||
    propsTemplate.unresolvedTemplateOptions.size > 0 ||
    scssTemplate.unresolvedTemplateOptions.size > 0 ||
    storyTemplate.unresolvedTemplateOptions.size > 0
  ) {
    console.warn(
      "Failed to resolve all of a templates terms",
      {
        componentTemplate: componentTemplate.unresolvedTemplateOptions,
        propsTemplate: propsTemplate.unresolvedTemplateOptions,
        scssTemplate: scssTemplate.unresolvedTemplateOptions,
        storyTemplate: storyTemplate.unresolvedTemplateOptions,
      }
    )
    process.exit(1);
  }

  // Create the directories and file fragments
  try {
    // Make a new folder to contain our component within
    await mkDir(
      path.resolve(paths.componentsPath, selections.directory, kebabName)
    );
    // Write the component template files
    const componentPath = await writeFile(
      path.resolve(paths.componentsPath, selections.directory, kebabName, `${kebabName}.tsx`),
      `${componentTemplate.template.trim()}\n`
    );
    const scssPath = await writeFile(
      path.resolve(paths.componentsPath, selections.directory, kebabName, `${kebabName}.scss`),
      `${scssTemplate.template.trim()}\n`
    );
    // Ensure we have a matching directory in our stories components for our
    // selected directory.
    await mkDir(
      path.resolve(paths.storiesComponents, selections.directory)
    );
    // Write our story template
    const storyPath = await writeFile(
      path.resolve(paths.storiesComponents, selections.directory, `${kebabName}.stories.tsx`),
      `${storyTemplate.template.trim()}\n`
    );
    // Ensure we have a matching directory in our stories data for our
    // selected directory.
    await mkDir(
      path.resolve(paths.storiesData, selections.directory)
    );
    // Write our story data template
    const propsPath = await writeFile(
      path.resolve(paths.storiesData, selections.directory, `${kebabName}-props.tsx`),
      `${propsTemplate.template.trim()}\n`
    );

    // Open the written files for review
    openFile(componentPath);
    openFile(scssPath);
    openFile(storyPath);
    openFile(propsPath);
  }

  catch (err) {
    console.warn("Could not create all file fragments:\n", err);
    process.exit(1);
  }
}

/**
 * This finds the nearest barrel file (parent barrel) to the newly created
 * component and adds the new component to the exports.
 */
async function updateBarrel(paths, selections) {
  const kebabName = paramCase(selections.name);
  const filePath = path.resolve(
    paths.componentsPath,
    selections.directory,
    kebabName,
    `${kebabName}.tsx`
  );

  // Get the barrel file that is the immediate parent
  const properBarrel = path.resolve(filePath, "../../index.ts");

  // We should require the barrel to be the immediate parent.
  if (!fs.existsSync(properBarrel)) {
    console.warn(
      `Not found: ${properBarrel}`,
      "A parent barrel file for the generated component does not exist and thus this component will not be exported with the library."
    );
    return;
  }

  let barrel = fs.readFileSync(properBarrel, { encoding: 'utf-8' });
  // Clear exact same export
  barrel = barrel.split(`export * from "./${kebabName}/${kebabName}";`).map(s => s.trim()).join("\n");
  // Inject the export at the bottom of the barrel
  barrel = `${barrel.trim()}\nexport * from "./${kebabName}/${kebabName}";\n`;
  // Write the new barrel
  fs.writeFileSync(properBarrel, barrel, { encoding: "utf-8" });
  // Open the barrel file for review
  openFile(properBarrel);
}

/**
 * This opens the specified file at the path in the editor for immediate review
 */
async function openFile(path) {
  if (fs.existsSync(path) && !fs.statSync(path).isDirectory()) {
    // Wait to make sure file actions have settled enough for the file to be
    // established on the file system
    await wait(100);
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
  await generateFragments(paths, selections);
  // Make sure the barrel file exports our component so it is included in the
  // output library.
  await updateBarrel(paths, selections);
}

module.exports = run;
