class ReposController {
    constructor(reposService) {
        this.reposService = reposService;
    }

    async getRepos(req, res) {
        const response = await this.reposService.getRepos();

        res.json({
            message: 'success',
            data: response
        });
    }
}

module.exports = ReposController;