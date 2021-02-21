const User = require('../models/User')();

module.exports = {
    'GET': {
        '/users': async function() {
            return await User.getAll();
        },
    },

    'POST': {
        '/users': async function(data) {
            return await User.create(JSON.parse(data.toString()));
        },
    }
}