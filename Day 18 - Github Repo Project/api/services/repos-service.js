class ReposService {
    constructor(db, redis) {
        this.reposDb = db.repos;
        this.reposRedis = redis.repos;
    }

    async getRepos() {
        const cachedRepos = await this.getReposFromCache();
        if (!cachedRepos) {
            const repos = await this.getReposFromDB();

            let count = 0;
            for (const repo of repos) {
                await this.reposRedis.hmsetAsync(`repos:${count}`, 'id', repo.id, 'full_name', repo.full_name, 'private', repo.private,
                    'description', repo.description, 'html_url', repo.html_url, 'forks', repo.forks, 'language', repo.language, 'created_at', repo.created_at);

                await this.reposRedis.hmsetAsync(`repos:${count}:owner`, 'id', repo.owner.id, 'html_url', repo.owner.html_url);

                await this.reposRedis.saddAsync('repos', `repos:${count}`);
                count++;
            }

            return repos;
        } else {
            return JSON.parse(cachedRepos);
        }
    }

    async getReposFromCache() {
        return this.reposRedis.getAsync('repos');
    }

    async getReposFromDB() {
        return this.reposDb.find();
    }
}

module.exports = ReposService;