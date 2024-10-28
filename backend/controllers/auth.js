// controllers/auth.js
const User = require('../models/User'); // Make sure you have a User model
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for generating tokens
const { v4: uuidv4 } = require('uuid');

// Signup handler
exports.signup = async (req, res) => {
    const { name, email, password, userType } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            userId: generateUniqueUserId() // Call function to generate unique ID
        });

        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login handler
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create a token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to generate a unique 6-digit user ID
const generateUniqueUserId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const randomChars = (Math.random() + 1).toString(36).substring(2, 4).toUpperCase(); // 2 capital letters
    return `${randomNum}${randomChars}`; // Combine to create user ID
};
