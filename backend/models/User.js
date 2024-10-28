// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ['USER', 'ADMIN'] },
    userId: { type: String, required: true, unique: true } // Unique user ID
});

module.exports = mongoose.model('User', userSchema);
