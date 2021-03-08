const path = require('path');

class PostsController {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }

    createPost = async (req, res) => {
        const user_id = req.params.user_id;
        const images = req.files;

        if (req.user._id !== user_id)
            return res.status(403).json({
                message: 'Unauthorized'
            });

        const post = {
            user_id: user_id,
            description: req.body.description,
            images: images.map(img => img.filename),
            isPrivate: req.body.isPrivate === 'true'
        }

        const response = await this.postService.createPostAndSave(post);
        if (response.message === 'Internal Error')
            return res.status(500).json(response);

        res.status(200).json(response);
    }

    getAllPosts = async (req, res) => {
        const user_id = req.params.user_id;
        const search = req.query.search || '';
        const limit = +req.query.limit || 5;
        const offset = +req.query.offset || 1;

        const user = req.user;

        const response = await this.postService.getUserPosts({
            user_id,
            search,
            limit,
            offset,
            user
        });

        if (response.message === 'Success')
            res.status(200);
        else
            res.status(500);

        res.json(response);
    }

    getPost = async (req, res) => {
        const user_id = req.params.user_id;
        const post_id = req.params.post_id;

        const response = await this.postService.getPostByPostId(post_id);
        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success') {
            if (response.data.isPrivate) {
                if (req.user && req.user._id === user_id)
                    return res.status(200).json(response);

                return res.status(403).json({
                    message: 'This post is private'
                });
            }

            res.status(200);
        } else
            res.status(400);

        res.json(response);
    }

    updatePost = async (req, res) => {
        const user_id = req.params.user_id;
        const post_id = req.params.post_id;
        const data = req.body;
        data.images = req.files.map(img => img.filename);

        if (req.user._id !== user_id)
            return res.status(403).json({
                message: 'Unauthorized'
            });

        const response = await this.postService.updatePostByPostId(post_id, data);
        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success')
            res.status(200);
        else
            res.status(400);

        res.json(response);
    }

    deletePost = async (req, res) => {
        const user_id = req.params.user_id;
        const post_id = req.params.post_id;

        if (req.user._id !== user_id)
            return res.status(403).json({
                message: 'Unauthorized'
            });

        const response = await this.postService.deletePostById(post_id);
        if (response.message === 'Internal Error')
            res.status(500);
        else if (response.message === 'Success')
            res.status(200);
        else
            res.status(200);

        res.json(response);
    }

    showPostPhoto = async (req, res) => {
        const user_id = req.params.user_id;
        const post_id = req.params.post_id;

        const response = await this.postService.getPhotoUrl(post_id);
        if (response.message === 'Internal Error')
            res.status(500).json(response);
        else if (response.message === 'Success') {
            if (response.data.isPrivate) {
                if (req.user && req.user._id === user_id) {
                    res.set('Content-Type', 'image/jpeg');
                    return res.status(200).sendFile(path.resolve('uploads', 'posts', response.data.images[0]));
                }

                return res.status(403).json({
                    message: 'This post is private'
                });
            }

            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(path.resolve('uploads', 'posts', response.data.images[0]));
        } else
            res.status(400).json(response);
    }

    getAll = async (req, res) => {
        const searchText = req.query.search || '';
        const limit = +req.query.limit || 5;
        const offset = +req.query.offset || 1;

        const response = await this.postService.getAllPosts({
            searchText,
            limit,
            offset
        });

        if (response.message === 'Internal Error')
            res.status(500);
        else
            res.status(200);

        res.json(response);
    }
}

module.exports = PostsController