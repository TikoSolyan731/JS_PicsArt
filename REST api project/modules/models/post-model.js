const mongoose = require('mongoose')
const postSchema = require('./schemas/post-schema')

module.exports = mongoose.model('posts', postSchema)