const User = require("../models/User")();

module.exports = {
    'GET': {
        [new RegExp('/users/(\\d+)/?')]: async function(id) {
            return await User.getById(id);
        },

        [new RegExp('/users/search/([a-zA-Z0-9_]*)/?')]: async function (username) {
            return await User.search(username.toString());
        }
    },

    'PUT': {
        [new RegExp('/users/update/(\\d+)/?')]: async function (id, data) {
            return await User.updateById(id, JSON.parse(data.toString()));
        }
    },

    'DELETE': {
        [new RegExp('/users/delete/(\\d+)/?')]: async function (id) {
            return await User.deleteById(id);
        }
    }
}