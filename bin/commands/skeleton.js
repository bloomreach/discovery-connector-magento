/**
 * The purpose of this command is to take in the current project and search for
 * templating items to be queried on and auto completed. This then builds out a
 * new project repo for this project to work within and performs any other
 * number of starter tasks that need to be completed.
 */

const { AutoComplete, Select, prompt } = require('enquirer');
const path = require("path");
const fs = require("fs-extra");
const template = require("../lib/util/template");
const changecase = require("change-case");
const rmrf = require("rimraf");
const shell = require("shelljs");
const wait = require("../lib/util/wait");

const TEST = process.env.TEST === "true";

/**
 * Recursively retrieve all files in a specified directory.
 */
const getAllFiles = function(dirPath, arrayOfFiles, excludeDir=new Set()) {
  if (!fs.statSync(dirPath).isDirectory()) {
    console.warn("getAllFiles: Path specified is not a directory");
  }

  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (excludeDir.has(file)) return;
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  })

  return arrayOfFiles;
}

/**
 * The purpose of this command is to take a project that has been "skeletonized"
 * and convert the skeleton to it's own project that has all of the fields it
 * needs populated properly filled in and set up with it's own unique repo.
 */
async function run() {
  const projectPath = path.resolve(".");
  const files = getAllFiles(projectPath, [], new Set(["node_modules", "dts", ".git"]));
  const filesWithOptions = [];

  // Read in the entire skeleton project's files and process each as text,
  // searching for template options based on the option syntax.
  files.forEach(file => {
    const contents = fs.readFileSync(file, "utf8");
    const options = [];

    const results = template({
      template: contents,
      doubleCurlyBrackets: true,
      options: {},

      onToken: (match, _) => {
        // The option key name will always be on the side of the colon which
        // delineates transformations of the term.
        const splits = match.split(":").map(x => x.trim());
        options.push(splits[0]);
        return match;
      }
    });

    if (options.length > 0) {
      filesWithOptions.push([file, options]);
    }
  });

  // Condense all options that the skeleton project will be configuring
  const allSkeletonOptions = new Set();
  filesWithOptions.forEach(([_, options]) => {
    options.forEach(option => allSkeletonOptions.add(option));
  });

  // Read in the configuration for the skeleton and match the configuration to
  // each option discovered
  const skeletonConf = fs.readJsonSync(path.resolve(projectPath, ".skeletonrc"));
  const optionWithConfiguration = new Map();

  allSkeletonOptions.forEach(optionName => {
    if (optionName in skeletonConf) {
      optionWithConfiguration.set(optionName, skeletonConf[optionName]);
    }
  });

  console.log("Found files with options:");
  console.log(filesWithOptions);

  // We need to ensure the property repoSSH is included in the values for the
  // sake of initializing the skeleton project.
  if (!optionWithConfiguration.has("repoSSH")) {
    optionWithConfiguration.set("repoSSH", {
      description: "Enter the SSH style URL for this repo, the skeleton command requires this specific field to set up the git repository. (the clone via ssh url)"
    });
  }

  // Now use enquirer to prompt the user for the values for each option
  const questions = [];
  optionWithConfiguration.forEach((config, optionName) => {
    questions.push({
      type: "input",
      name: optionName,
      message: `${optionName}: ${config.description}`
    });
  });

  const answers = await prompt(questions);

  // Now we take the processed answers and apply them to all template options
  // across all files.
  filesWithOptions.forEach(([file]) => {
    const contents = fs.readFileSync(file, "utf8");
    const results = template({
      template: contents,
      doubleCurlyBrackets: true,
      // Inject the mapped template options with the answers
      options: answers,

      onToken: (match, replace) => {
        match = match.trim();

        if (match in answers) {
          return answers[match];
        }

        const checks = match.split(":").map(s => s.trim());

        if (checks[0] in answers) {
          let result = answers[checks[0]];

          // Look for a transform to the case
          switch (checks[1]) {
            case "upper": result = changecase.capitalCase(result); break;
            case "lower": result = changecase.lowerCase(result); break;
            case "camel": result = changecase.camelCase(result); break;
            case "title": result = changecase.titleCase(result); break;
            case "pascal": result = changecase.pascalCase(result); break;
            case "constant": result = changecase.constantCase(result); break;
            case "sentence": result = changecase.sentenceCase(result); break;
            case "header": result = changecase.headerCase(result); break;
            case "snake": result = changecase.snakeCase(result); break;

            case "kebab":
            case "param": result = changecase.paramCase(result); break;

            default:
              break;
          }

          return result;
        }

        return match;
      }
    });

    // If we don't allow writes for testing purposes, we stop here
    if (TEST) return;
    // Write the results back to the file
    fs.writeFileSync(file, results.template);
  });

  // Next let's modify the package.json to exclude any skeleton commands
  const packageJson = fs.readJsonSync(path.resolve(projectPath, "package.json"));
  delete packageJson.scripts["skeleton"];
  delete packageJson.scripts["start"];
  // Write the new package json.
  if (!TEST) fs.writeJsonSync(path.resolve(projectPath, "package.json"), packageJson);

  // Last, we need to initialize this as a new git repository. We guarantee the
  // repoSSH property to handle this matter.
  if (!TEST) {
    let rmrfResolve;
    const rmrfPromise = new Promise(r => rmrfResolve = r);
    rmrf(path.resolve(projectPath, ".git"), (err) => {
      if (err) {
        console.warn(err);
      }

      rmrfResolve();
    });

    // Wait for the git folder to be removed completely
    await rmrfPromise;
    // Give the filesystem a moment to flush
    await wait(100);

    if (shell.exec("git init").code !== 0) {
      console.error("Error: git init failed");
      return;
    }

    if (shell.exec("git remote add origin " + answers.repoSSH).code !== 0) {
      console.error("Error: git remote add origin failed");
      return;
    }

    // We we swap all .skeleton files with the same named file and delete the
    // skeleton file.
    files.forEach(file => {
      if (file.endsWith(".skeleton")) {
        const replaceFile = file.replace(".skeleton", "");

        if (fs.existsSync(replaceFile)) {
          fs.removeSync(replaceFile);
        }

        fs.renameSync(file, replaceFile);
      }
    });
  }

  // Perform one last install to make sure post operations have the correct
  // installed packages based on the finalize npm package
  if (shell.exec("npm install").code !== 0) {
    console.error("Error: Final npm install failed. Please look at the logs for errors and manually npm install again.");
    return;
  }


  console.log("Skeleton project initialized successfully!");
  console.log("You can now make your first commit and push to the remote repo.");
}

module.exports = run;
