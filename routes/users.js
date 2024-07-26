const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error during profile retrieval:', error);
        res.status(500).json({ message: 'Server error during profile retrieval' });
    }
});

// Get user posts
router.get('/profile/:userId/posts', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.json(posts);
    } catch (error) {
        console.error('Error during post retrieval:', error);
        res.status(500).json({ message: 'Server error during post retrieval' });
    }
});

// Delete user post
router.delete('/profile/:userId/posts/:postId', async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ id: req.params.postId, userId: req.params.userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error during post deletion:', error);
        res.status(500).json({ message: 'Server error during post deletion' });
    }
});

module.exports = router;
