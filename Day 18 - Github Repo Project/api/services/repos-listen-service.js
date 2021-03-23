class ReposListenService {
    constructor(db, redis) {
        this.reposDb = db.repos;
        this.reposRedis = redis.repos;
        this.reposListenerRedis = redis.reposListener;
    }

    listenForRepoChanges() {
        this.reposListenerRedis.on('message', async (channel, message) => {
            const repos = await this.reposDb.find();

            this.reposRedis.setAsync('repos', JSON.stringify(repos));
        });
    }
}

module.exports = ReposListenService;