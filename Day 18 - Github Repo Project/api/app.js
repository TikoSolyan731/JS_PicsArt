const express = require('express');
require('dotenv').config();

const configs = require('./configs');
const container = require('./container');

const app = express();

// Configurations of the app (Mongo, Redis)
configs.configure(app);
// Setup the container
container.load(app);

const reposController = app.container.resolve('reposController');

app.get('/api/repos', reposController.getRepos.bind(reposController));

const reposListenService = app.container.resolve('reposListenService');
// Redis PubSub - always listens if the script ran
reposListenService.listenForRepoChanges();

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`);
});