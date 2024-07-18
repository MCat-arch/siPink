const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://khoerunnisautami22:siPink3000@sipink.d6ouysq.mongodb.net/siPinkDB",{ useNewUrlParser: true, useUnifiedTopology: true }, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
