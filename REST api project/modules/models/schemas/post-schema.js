const { Schema } = require('mongoose');

const postSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    description: {
        type: String,
        required: true
    },
    images: Array,
    isPrivate: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

postSchema.index({ user_id: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ description: 'text' });

module.exports = postSchema;