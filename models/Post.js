// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    reportType: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    urgencyLevel: { type: String, required: true },
    mediaURLs: [String],
});

module.exports = mongoose.model('Post', postSchema);
