require('dotenv').config();

const configs = require('./script-configs');
const container = require('./script-container');
const script = {};

// Configure the script (Mongo, Redis)
configs.configure(script);
// Load the container
container.load(script);

const repoLoadService = script.container.resolve('repoLoadService');

// Get the terminal arguments
const args = process.argv.slice(2);

repoLoadService.loadReposAndSave(process.env.GITHUB_BASE, args).then(repos => {
    console.log(repos);
});