const path = require('path');
const fs = require('fs-extra');
const targetProjectName = require('../target-project/target-project-name');
const template = require('../util/template');
const validSyncFile = require('./valid-sync-file');
const pascalCase = require('pascalcase');
const camelCase = require('camelcase');

/**
 * This performs the creation of a new API file for a give file extension type at the provided address
 */
async function newLyraFile(filePath) {
  console.log('Generating new lyra file at:', filePath);
  // Make sure the directories exist for the file
  fs.ensureDirSync(path.dirname(filePath));
  // This is the extension of the file. We will create different initial API files for different types of file.
  const fileExtension = path.extname(filePath);
  const fileBaseName = path.basename(filePath).split('.')[0];

  if (!validSyncFile(filePath)) {
    console.log('The input file is not flagged as a valid file with an available synced output.');
    return;
  }

  // Common replacement options for our template files.
  const templateOptions = {
    component: pascalCase(path.basename(filePath).split('.')[0]),
    method: camelCase(path.basename(filePath).split('.')[0]),
    project: await targetProjectName()
  };

  // Barrel files should produce barrel file templates
  if (fileBaseName === 'index') {
    const templateFile = fs.readFileSync(
      path.resolve(__dirname, '../../../install/templates/lyra-barrel.template'),
      { encoding: 'utf8' }
    );

    const results = template({
      options: templateOptions,
      template: templateFile
    });

    fs.writeFileSync(filePath, results.template, { encoding: 'utf8' });
  }

  // Jump to the appropriate create action for the API
  switch (fileExtension) {
    // This will take on our utility form of API initialization
    case 'js':
    case '.ts': {
      const templateFile = fs.readFileSync(
        path.resolve(__dirname, '../../../install/templates/lyra-util.template'),
        { encoding: 'utf8' }
      );

      const results = template({
        options: templateOptions,
        template: templateFile
      });

      fs.writeFileSync(filePath, results.template, { encoding: 'utf8' });
      break;
    }

    // This will take on our React form of API initialization
    case 'jsx':
    case '.tsx': {
      const templateFile = fs.readFileSync(
        path.resolve(__dirname, '../../../install/templates/lyra-tsx.template'),
        { encoding: 'utf8' }
      );

      const results = template({
        options: templateOptions,
        template: templateFile
      });

      fs.writeFileSync(filePath, results.template, { encoding: 'utf8' });
      break;
    }

    default:
      console.log(
        'No template for a lyra file for extension', fileExtension,
        'for file', filePath
      );
      break;
  }
}

module.exports = newLyraFile;
