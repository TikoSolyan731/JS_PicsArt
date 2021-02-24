const express = require('express');
const router = express.Router();

const usersRouter = require('./routers/usersRouter');

router.use(express.json());

router.use('/users', usersRouter);

module.exports = router;