require('dotenv').config();

const express = require('express');
const defaultConfig = require('./confs/default_config');

const app = express();

const apiV1 = require('./api');

app.use('/apiv1', apiV1);

app.listen(defaultConfig.PORT, () => {
    console.log(`Server started at port ${defaultConfig.PORT}...`);
});