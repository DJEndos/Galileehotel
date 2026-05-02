const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

// ============================================================
//   GALILEE HOTEL — Auth Route (routes/auth.js)
//   Handles admin login and token generation
// ============================================================

const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

// Hardcoded admin credentials
// In production these come from environment variables
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'kammapanasonic@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Galileehotel@gmail.com';
const JWT_SECRET     = process.env.JWT_SECRET     || '3ef41e91a8e3c290424378d5867d828c5925e5f809902823ecd9436a59446fbf';
const JWT_EXPIRES    = process.env.JWT_EXPIRES_IN || '7d';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    // Check email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Check password
    // If ADMIN_PASSWORD is a bcrypt hash, use bcrypt.compare
    // If plain text (for first setup), compare directly
    let passwordMatch = false;

    if (ADMIN_PASSWORD.startsWith('$2')) {
      // It's a bcrypt hash
      passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
    } else {
      // Plain text comparison (change to hash in production)
      passwordMatch = password === ADMIN_PASSWORD;
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: ADMIN_EMAIL,
        role:  'admin',
        name:  'Galilee Admin'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      success: true,
      token,
      name:    'Galilee Admin',
      email:   ADMIN_EMAIL,
      message: 'Login successful'
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// POST /api/auth/verify — verify a token
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, admin: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // JWT is stateless — client just deletes the token
  res.json({ success: true, message: 'Logged out successfully.' });
});

module.exports = router;