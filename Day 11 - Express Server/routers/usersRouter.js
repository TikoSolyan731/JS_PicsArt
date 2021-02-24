const express = require('express');
const router = express.Router();

const userValidator = require('../validators/userValidator')();
const usersController = require('../controllers/usersController')(userValidator);

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUser);
router.get('/search/:username', usersController.search);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;