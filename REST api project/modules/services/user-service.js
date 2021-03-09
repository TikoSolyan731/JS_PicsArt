const bcrypt = require('bcrypt')

const UserModel = require('../models/user-model');

class UserService {
    constructor(postService) {
        this.postService = postService;
    }

    async createUserAndSave(user) {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        user.password = await bcrypt.hash(user.password, salt)

        const newUser = new UserModel(user)
        try {
            await newUser.save()

            return {
                message: 'Success',
                data: newUser
            }
        } catch(err) {
            return {
                message: 'Internal Error',
                data: err
            }
        }
    }

    async getAllUsers(filters) {
        const limit = filters.limit;
        const skip = limit * (filters.offset - 1);

        try {
            let users = await UserModel.find()
                .sort({createdAt: 1})
                .limit(limit)
                .skip(skip);

            if (filters.username && filters.username.length)
                users = users.filter(u => u.username.includes(filters.username));

            return {
                message: 'Success',
                data: users
            }
        } catch (err) {
            return {
                message: 'Internal error',
                data: err
            }
        }
    }

    async getUserById(id) {
        try {
            const user = await UserModel.findById(id);

            if (user) {
                return {
                    message: 'Success',
                    data: user
                }
            }

            return {
                message: 'No such user found',
                data: {}
            }
        } catch (err) {
            return {
                message: 'Internal error',
                data: err
            }
        }
    }
    //
    // async checkUserExists(id) {
    //     const user = await UserModel.findById(id, { _id: 1 }).lean();
    //
    //     return !!user;
    // }

    async updateUserById(id, data) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, data, {new: true});

            if (user) {
                return {
                    message: 'Success',
                    data: user
                }
            }

            return {
                message: 'No such user found',
                data: {}
            }
        } catch(err) {
            return {
                message: 'Internal error',
                data: err
            }
        }
    }

    async deleteUserById(id) {
        try {
            const user = await UserModel.findByIdAndDelete(id);

            if (user) {
                return {
                    message: 'Success',
                    data: user
                }
            }

            return {
                message: 'No such user found',
                data: {}
            }
        } catch (err) {
            return {
                message: 'Internal error',
                data: err
            }
        }
    }

    async checkUser(username, password) {
        const user = await UserModel.findOne({ username: username }, { _id: 1, password: 1 });
        if (!user)
            return {
                message: 'Error',
                data: {}
            }

        const result = await bcrypt.compare(password, user.password);

        if (user && result) {
            return {
                message: 'Success',
                data: user
            }
        } else {
            return {
                message: 'Error',
                data: {}
            }
        }
    }
}

module.exports = UserService