const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'publik')));

// Debugging middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Routes
app.post('/register', async (req, res) => {
    const { name, address, password } = req.body;
    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, address, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/post', async (req, res) => {
    const { reportType, content, location, urgencyLevel, mediaURLs } = req.body;
    try {
        const newPost = new Post({ reportType, content, location, urgencyLevel, mediaURLs });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/post', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'login.html'));
});

app.get('/sign-up.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'sign-up.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'post.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
