// server.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'publik')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

/*
function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).redirect('/login.html');
    }

    // Here you should verify the token (e.g., using JWT)
    // jwt.verify(token, 'your_secret_key', (err, decoded) => {
    //     if (err) {
    //         console.log('Token verification failed', err);
    //         return res.status(401).redirect('/login.html');
    //     }
    //     req.user = decoded;
    //     next();
    // });

    // For demonstration, let's assume the token is always valid
    next();
}
*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'index.html'));
});

app.get('/profil.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'profil.html'));
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publik', 'dashboard.html'));
});

const PORT = process.env.PORT || 2025;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
