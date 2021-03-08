const express = require('express');
const postsRoute = express.Router();

const UserService = require('../modules/services/user-service');
const PostService = require('../modules/services/post-service');
const PostsController = require('../modules/controllers/posts-controller');
const AuthController = require('../modules/controllers/auth-controller');

const postService = new PostService();
const userService = new UserService(postService);
const postsController = new PostsController(postService, userService);
const authController = new AuthController(userService);

postsRoute.get('/all', postsController.getAll);

module.exports = postsRoute;