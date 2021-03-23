class ReposService {
    constructor(db, redis) {
        this.reposDb = db.repos;
        this.reposRedis = redis.repos;
    }

    async getRepos() {
        const cachedRepos = await this.getReposFromCache();
        if (!cachedRepos) {
            const repos = await this.getReposFromDB();

            await this.reposRedis.setAsync('repos', JSON.stringify(repos));

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