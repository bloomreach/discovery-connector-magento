/**
 * A simple wait method for a duration
 */
async function run(t) {
  await new Promise(r => setTimeout(r, t));
}

module.exports = run;
