const awilix = require('awilix');

const RepoLoadService = require('../repo_loading/services/repo-load-service');

const load = (script) => {
    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.CLASSIC,
        lifetime: awilix.Lifetime.SINGLETON
    });

    container.register({
        repoLoadService: awilix.asClass(RepoLoadService)
    });
    container.register({
        db: awilix.asValue(script.db),
        redis: awilix.asValue(script.redis)
    });

    script.container = container;
}

exports.load = load;