// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    reportType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    urgencyLevel: {
        type: String,
        required: true,
    },

    mediaURLs: [String],
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', PostSchema);
