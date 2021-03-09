class UsersController {
    constructor(userService, postService) {
        this.userService = userService;
        this.postService = postService;
    }

    create = async (req, res) => {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        const response = await this.userService.createUserAndSave(user);
        if (response.message === 'Internal Error')
            return res.status(500).json(response);

        res.status(201).json(response);
    }

    getAll = async (req, res) => {
        const username = req.query.username;
        const limit = +req.query.limit || 5;
        const offset = +req.query.offset || 1;

        const response = await this.userService.getAllUsers({
            username,
            limit,
            offset
        });
        if (response.message === 'Internal Error')
            return res.status(500).json(response);

        res.status(200).json(response);
    }

    getById = async (req, res) => {
        const user_id = req.params.user_id;

        const response = await this.userService.getUserById(user_id);
        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success')
            res.status(200);
        else
            res.status(400);

        res.json(response);
    }

    updateById = async (req, res) => {
        const user_id = req.params.user_id;
        const data = req.body;

        if (req.user._id !== user_id)
            return res.status(403).json({
                message: 'Unauthorized'
            });

        const response = await this.userService.updateUserById(user_id, data);
        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success')
            res.status(200);
        else
            res.status(400);

        res.json(response);
    }

    deleteById = async (req, res) => {
        const user_id = req.params.user_id;

        if (req.user._id !== user_id)
            return res.status(403).json({
                message: 'Unauthorized'
            });

        const response = await this.userService.deleteUserById(user_id);
        await this.postService.deleteUserPosts(user_id);

        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success')
            res.status(200);
        else
            res.status(400);

        res.json(response);
    }
}

module.exports = UsersController;