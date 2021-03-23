const mongoose = require('mongoose');
const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));

require('../api/models/repos');

const configure = (script) => {
    const dbConfigs = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    const scriptDb = mongoose.createConnection(process.env.DB, dbConfigs);
    script.db = {
        repos: scriptDb.model('repos')
    };

    script.redis = {
        repos: redis.createClient(6379, process.env.HOST, {db: 0})
    }
}

exports.configure = configure;