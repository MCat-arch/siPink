// models/Post.js
// models/Post.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const postSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    reportType: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    urgencyLevel: { type: String, required: true },
    mediaURLs: [String],
    status: { type: String, default: 'antrian' },
    userId: { type: String, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);

/*
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    reportType: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    urgencyLevel: { type: String, required: true },
    mediaURLs: [String],
});

module.exports = mongoose.model('Post', postSchema);
*/