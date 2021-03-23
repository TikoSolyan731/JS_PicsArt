const mongoose = require('mongoose');
const { Schema } = mongoose;

const repoSchema = new Schema({
    id: Number,
    full_name: String,
    private: Boolean,
    description: String,
    owner: {
        id: Number,
        html_url: String
    },
    html_url: String,
    forks: Number,
    language: String,
    created_at: Date
});

module.exports = mongoose.model('repos', repoSchema);