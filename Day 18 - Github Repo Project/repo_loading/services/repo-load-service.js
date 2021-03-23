const axios = require('axios');

class RepoLoadService {
    constructor(db, redis) {
        this.reposDb = db.repos;
        this.reposRedis = redis.repos;
    }

    // args[0] - query search text
    // args[1] - item count
    // args[2] - page number
    async loadReposAndSave(url, args) {
        const query = args[0] || 'test';
        const perPage = args[1] || 5;
        const page = args[2] || 1;

        const requestUrl = `${url}?q=${query}&per_page=${perPage}&page=${page}`;
        const response = await axios.get(requestUrl);

        // Delete previous data in DB
        await this.reposDb.deleteMany();

        const miniRepos = [];
        for (const repo of response.data.items) {
            const miniRepo = new this.reposDb({
                id: repo.id,
                full_name: repo.full_name,
                private: repo.private,
                description: repo.description,
                owner: {
                    id: repo.owner.id,
                    html_url: repo.owner.html_url
                },
                html_url: repo.html_url,
                forks: repo.forks,
                language: repo.language,
                created_at: repo.created_at
            });

            miniRepos.push(await miniRepo.save());
        }
        // Notify the app about the changes
        this.reposRedis.publishAsync('repoChannel', 'update');

        return miniRepos;
    }
}

module.exports = RepoLoadService;