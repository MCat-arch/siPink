// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { content, reportType, location, urgencyLevel, mediaURLs } = req.body;
    try {
        const newPost = new Post({
            userId: req.user.id,
            userName: req.user.name,
            content,
            reportType,
            location,
            urgencyLevel,
            mediaURLs,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
