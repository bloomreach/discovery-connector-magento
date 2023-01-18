const webpack = require('webpack');

/**
 * This performs the bundling process for distribution.
 */
async function run(webpackConfig, MODE) {
  try {
    let resolve;
    const promise = new Promise(r => (resolve = r));
    process.env.NODE_ENV = MODE || 'production';

    console.log('Bundling Project:', webpackConfig.entry);
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        process.exit(1);
      }

      console.log('\n\n\n-----BUNDLE-----');
      console.log(webpackConfig.entry);
      console.log(stats.toString({
        colors: true,
      }));

      console.log('Finished bundling project:', webpackConfig.entry);
      resolve();
    });

    await promise;
  }

  catch (err) {
    console.log('Failed to bundle distribution');
    console.log(err.stack || err.message);
  }
}

module.exports = run;
