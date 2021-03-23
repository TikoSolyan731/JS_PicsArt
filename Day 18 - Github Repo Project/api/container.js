const awilix = require('awilix');

const ReposController = require('./controllers/repos-controller');
const ReposService = require('./services/repos-service');
const ReposListenService = require('./services/repos-listen-service');

// Awilix is a Dependency Injection container for node
const load = (app) => {
    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.CLASSIC,
        lifetime: awilix.Lifetime.SINGLETON
    });

    container.register({
        reposController: awilix.asClass(ReposController)
    });
    container.register({
        reposService: awilix.asClass(ReposService)
    });
    container.register({
        db: awilix.asValue(app.dbAres),
        redis: awilix.asValue(app.redis)
    });
    container.register({
        reposListenService: awilix.asClass(ReposListenService)
    });

    app.container = container;
}

exports.load = load;