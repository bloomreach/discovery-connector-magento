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

// Build the command
const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .source(path.resolve(".") + "/")
  .destination(path.resolve("./.magento/src/app/code/Bloomreach/Connector"));

rsync.exclude([
  '.git',
  '.idea',
  'node_modules',
  'scripts',
  '.magento'
]);

// Log output
rsync.output(
  function(data){
    console.log(data);
  }, function(data) {
    console.error(data);
  }
);

// Execute the command
rsync.execute(function(error, code, cmd) {
  // we're done
});
