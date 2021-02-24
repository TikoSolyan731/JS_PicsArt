const dbController = require('../controllers/dbController')();

module.exports = (validator) => {
    return {
        createUser,
        getAllUsers,
        getUser,
        search,
        updateUser,
        deleteUser,
    };

    async function createUser(req, res) {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        }

        const {error} = await validator.validate(user);
        if (error) {
            return res.status(400).json({
                message: 'error',
                reason: error.details[0].message,
            });
        }

        let lastId = await dbController.getLastId('users');
        lastId = isNaN(lastId) ? 0 : lastId;

        user.id = lastId + 1;

        const response = await dbController.save('users', user);
        if (response.message !== 'error')
            return res.status(201).json(response);
        else
            return res.status(500).json(response);
    }

    async function getAllUsers(req, res) {
        const response = await dbController.getAllDocuments('users');

        if (response.message !== 'error')
            return res.status(200).json(response);
        else
            return res.status(500).json(response);
    }

    async function getUser(req, res) {
        const id = req.params.id;

        const response = await dbController.getDocumentById('users', id);

        if (response.message !== 'error')
            res.status(200).json(response);
        else
            res.status(400).json(response);
    }

    async function search(req, res) {
        const searchText = req.params.username;

        const response = await dbController.getDocumentByField('users', 'username', searchText);

        if (response.message !== 'error')
            res.status(200).json(response);
    }

    async function updateUser(req, res) {
        const id = req.params.id;
        const updateValues = req.body;

        const response = await dbController.updateDocumentById('users', id, updateValues);

        if (response.message !== 'error')
            res.status(200).json(response);
        else
            res.status(400).json(response);
    }

    async function deleteUser(req, res) {
        const id = req.params.id;

        const response = await dbController.deleteDocumentById('users', id);

        if (response.message !== 'error')
            res.status(200).json(response);
        else
            res.status(400).json(response);
    }
}