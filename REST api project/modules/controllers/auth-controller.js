const jwt = require('jsonwebtoken');

class AuthController {
    constructor(userService) {
        this.userService = userService;
    }

    login = async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password)
            res.status(400).json({
                message: 'Fill in all the fields',
                data: {}
            });

        const response = await this.userService.checkUser(username, password);

        if (response.message === 'Success') {
            const accessToken = jwt.sign({_id: response.data._id}, process.env.JWT_SECRET);

            res.json({
                accessToken
            });
        } else {
            res.json({
                message: 'Username or password is wrong'
            });
        }
    }

    authenticate = async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }

    softAuthenticate = async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.user = user;
                next();
            });
        } else {
            next();
        }
    }
}

module.exports = AuthController;