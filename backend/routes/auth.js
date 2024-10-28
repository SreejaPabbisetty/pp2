// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth'); // Make sure you have a signup and login controller

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

module.exports = router;
