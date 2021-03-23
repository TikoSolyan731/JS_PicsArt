const mongoose = require('mongoose');
const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));

require('./models/repos');

const configure = async (app) => {
    const dbConfigs = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    const db1 = mongoose.createConnection(process.env.DB, dbConfigs);
    app.dbAres = {
        repos: db1.model('repos')
    };

    // 2 Redis clients - one that works with repos, and another that listens for the script
    app.redis = {
        repos: redis.createClient(6379, process.env.HOST, {db: 0}),
        reposListener: redis.createClient(6379, process.env.HOST, {db: 0})
    }
    app.redis.reposListener.subscribeAsync('repoChannel');
}

exports.configure = configure;