const path = require('path');
const express = require('express');
const usersRoute = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads', 'posts'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${req.params.user_id}_${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const imageReg = /\.(gif|jpg|jpeg|tiff|png)$/i;

        if (file.originalname.match(imageReg))
            cb(null, true);
        else
            cb(new Error('File must be an image!'));
    }
});

const UserService = require('../modules/services/user-service');
const UsersController = require('../modules/controllers/users-controller');
const PostService = require('../modules/services/post-service');
const PostsController = require('../modules/controllers/posts-controller');
const AuthController = require('../modules/controllers/auth-controller');

const postService = new PostService();
const userService = new UserService(postService);
const usersController = new UsersController(userService, postService);
const postsController = new PostsController(postService, userService);
const authController = new AuthController(userService);

usersRoute.get('/', usersController.getAll);

usersRoute.get('/:user_id', usersController.getById);

usersRoute.post('/', usersController.create);

usersRoute.put('/:user_id', authController.authenticate, usersController.updateById);

usersRoute.delete('/:user_id', authController.authenticate, usersController.deleteById);

usersRoute.post('/:user_id/posts', [
        authController.authenticate,
        upload.array('images', 5)
    ],
    postsController.createPost);

usersRoute.get('/:user_id/posts', authController.softAuthenticate, postsController.getAllPosts);

usersRoute.get('/:user_id/posts/:post_id', authController.softAuthenticate, postsController.getPost);

usersRoute.put('/:user_id/posts/:post_id', [
    authController.authenticate,
    upload.array('images', 5)
], postsController.updatePost);

usersRoute.delete('/:user_id/posts/:post_id', authController.authenticate, postsController.deletePost);

module.exports = usersRoute;