const glob = require('glob');
const { unlink } = require('fs');
const { resolve } = require('path');

async function run() {
  /**
   * Occasionally it happens that .d.ts files get generated while managing the build system
   */
  glob(resolve('src', '**', '*.d.ts'), (err, matches = []) => {
    if (err) console.log(err);

    matches.forEach(fileName => {
      unlink(fileName, err => {
        if (err) console.log('Could not remove', fileName);
      });
    });
  });

  glob(resolve('lib', '**', '*.d.ts'), (err, matches = []) => {
    if (err) console.log(err);

    matches.forEach(fileName => {
      unlink(fileName, err => {
        if (err) console.log('Could not remove', fileName);
      });
    });
  });

  glob(resolve('app', '**', '*.d.ts'), (err, matches = []) => {
    if (err) console.log(err);

    matches.forEach(fileName => {
      unlink(fileName, err => {
        if (err) console.log('Could not remove', fileName);
      });
    });
  });

  glob(resolve('test', '**', '*.d.ts'), (err, matches = []) => {
    if (err) console.log(err);

    matches.forEach(fileName => {
      unlink(fileName, err => {
        if (err) console.log('Could not remove', fileName);
      });
    });
  });

  glob(resolve('unit-test', '**', '*.d.ts'), (err, matches = []) => {
    if (err) console.log(err);

    matches.forEach(fileName => {
      unlink(fileName, err => {
        if (err) console.log('Could not remove', fileName);
      });
    });
  });
}

module.exports = run;
