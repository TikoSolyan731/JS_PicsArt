require('dotenv').config();
const express = require('express');
const path = require('path');

const AuthController = require('./modules/controllers/auth-controller');
const UserService = require('./modules/services/user-service');
const PostService = require('./modules/services/post-service');

const dbController = require('./modules/controllers/db-controller');
const usersRoute = require('./routes/users-route');
const postsRoute = require('./routes/posts-route');
const userService = new UserService(new PostService());

const authController = new AuthController(userService);

const app = express();

(async () => {
    await dbController.startConnection(process.env.DB_URI);
})();

app.use(express.urlencoded());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads', 'posts')));


app.post('/login', authController.login);

app.use('/users', usersRoute);
app.use('/posts', postsRoute);

app.use((req, res, next) => {
    res.status(404).json({message: 'Page not found'});
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running on port ${process.env.PORT}...`)
});