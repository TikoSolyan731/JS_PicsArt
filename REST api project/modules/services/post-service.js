const fs = require('fs').promises;
const path = require('path');

const PostModel = require('../models/post-model');

class PostService {
    async createPostAndSave(post) {
        const newPost = new PostModel(post);

        try {
            await newPost.save();

            return {
                message: 'Success',
                data: newPost
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async getUserPosts(options) {
        const {user_id, search, limit, offset, user} = options;
        const skip = limit * (offset - 1);
        const includePrivates = user ? user._id === user_id : false;

        try {
            let query;
            if (search) {
                query = includePrivates
                    ? PostModel.find({user_id: user_id, $text: {$search: search}})
                    : PostModel.find({user_id: user_id, $text: {$search: search}, isPrivate: false});
            } else {
                query = includePrivates
                    ? PostModel.find({user_id: user_id})
                    : PostModel.find({user_id: user_id, isPrivate: false});
            }

            const posts = await query
                .sort({ createdAt: 1 })
                .limit(limit)
                .skip(skip);

            return {
                message: 'Success',
                data: posts
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async getPostByPostId(post_id) {
        try {
            const post = await PostModel.findById(post_id);

            if (!post) {
                return {
                    message: 'No such post found',
                    data: {}
                }
            }
            post.images = post.images.map(img => `http://${process.env.HOST}:${process.env.PORT}/uploads/${img}`);

            return {
                message: 'Success',
                data: post
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async getPhotoUrl(post_id) {
        try {
            const post = await PostModel.findById(post_id, { images: 1, isPrivate: 1 });

            if (!post) {
                return {
                    message: 'No such post found',
                    data: {}
                }
            }

            return {
                message: 'Success',
                data: post
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async updatePostByPostId(id, data) {
        try {
            const oldPost = await PostModel.findById(id, { images: 1, _id: 0 });
            if (data.images && data.images.length) {
                for (const img of oldPost.images) {
                    await fs.unlink(path.resolve('uploads', 'posts', img));
                }
            }

            const post = await PostModel.findByIdAndUpdate(id, data, {new: true});

            if (!post) {
                return {
                    message: 'No such post found',
                    data: {}
                }
            }

            return {
                message: 'Success',
                data: post
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async deletePostById(id) {
        try {
            const post = await PostModel.findByIdAndDelete(id);
            for (const img of post.images) {
                await fs.unlink(path.resolve('uploads', 'posts', img));
            }

            if (!post)
                return {
                    message: 'No such post found',
                    data: {}
                }

            return {
                message: 'Success',
                data: post
            }
        } catch (err) {
            return {
                message: "Internal Error",
                data: err
            }
        }
    }

    async deleteUserPosts(user_id) {
        const postIds = await PostModel.find({ user_id: user_id }, { _id: 1 });

        for (const post_id of postIds) {
            await this.deletePostById(post_id);
        }

        // return PostModel.deleteMany({user_id: user_id});
    }

    async getAllPosts(options) {
        const search = options.searchText;
        const limit = options.limit;
        const skip = limit * (options.offset - 1);

        try {
            const posts = search ? await PostModel.find({$text: {$search: search}, isPrivate: false})
                    .sort({createdAt: 1})
                    .limit(limit)
                    .skip(skip) :
                await PostModel.find({})
                    .sort({createdAt: 1})
                    .limit(limit)
                    .skip(skip);

            return {
                message: 'Success',
                data: posts
            }
        } catch (err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }
}

module.exports = PostService;