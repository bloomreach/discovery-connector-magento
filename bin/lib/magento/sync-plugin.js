/**
 * This is to aid in developing the magento extension using a locally installed
 * magento application within the project folder.
 *
 * This will simply sync the files from this project to the src/app/code so the
 * project will properly register the extension.
 *
 * Symlinks to the files are NOT supported by Magento even though the option is
 * still in the dev settings. Magento still requires the files be beneath the
 * magento projects root folder.
 */
const Rsync = require('rsync');
const path = require('path');
const rmrf = require('rimraf');
const fs = require('fs-extra');

// Ensure reliable project root path.
const projectRoot = path.resolve(__dirname, '../../../');

if (!fs.existsSync(path.resolve(projectRoot, ".magento"))) {
  console.error(".magento directory not found. Please run `npm run magento-install` to install magento for this project.");
  process.exit(1);
}

// Ensure the plugin directory exists.
if (!fs.existsSync(path.resolve(projectRoot, ".magento/src/app/code/Bloomreach/Connector"))) {
  fs.ensureDirSync(path.resolve(projectRoot, ".magento/src/app/code/Bloomreach/Connector"));
}

// Ensure all files all cleaned so they sync correctly and won't leave behind
// fragments
rmrf.sync(path.resolve(projectRoot, ".magento/src/app/code/Bloomreach/Connector"));

// Build the command
const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .source(projectRoot + "/")
  .destination(path.resolve(projectRoot, ".magento/src/app/code/Bloomreach/Connector"));

rsync.exclude([
  '.git',
  '.idea',
  'node_modules',
  'scripts',
  '.magento',
  '*.local.*',
  'project.tar.gz'
]);

// Log output
rsync.output(
  function(data){
    console.log(data.toString());
  }, function(data) {
    console.error(data.toString());
  }
);

// Execute the command
rsync.execute(function(error, code, cmd) {
  // we're done
});
