const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Create new post
router.post('/post', async (req, res) => {
    const { reportType, content, location, urgencyLevel, mediaURLs } = req.body;

    try {
        const newPost = new Post({ reportType, content, location, urgencyLevel, mediaURLs });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error during post creation:', error);
        res.status(500).json({ message: 'Server error during post creation' });
    }
});

// Retrieve all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error during post retrieval:', error);
        res.status(500).json({ message: 'Server error during post retrieval' });
    }
});

module.exports = router;
