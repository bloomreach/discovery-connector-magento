// Load the correct environment variables
require('dotenv').config({ path: '.env.test' });
// Enable require() to load .ts files
const { resolve } = require('path');

console.log('Using tsconfig:', resolve('tsconfig.json'));

require('ts-node').register({
  project: resolve('tsconfig.json'),
  transpileOnly: true,
});
