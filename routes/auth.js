
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'kammapanasonic@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Galileehotel@gmail.com';
const JWT_SECRET     = process.env.JWT_SECRET     || '3ef41e91a8e3c290424378d5867d828c5925e5f809902823ecd9436a59446fbf';
const JWT_EXPIRES    = process.env.JWT_EXPIRES_IN || '7d';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' });
    }
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const match = ADMIN_PASSWORD.startsWith('$2')
      ? await bcrypt.compare(password, ADMIN_PASSWORD)
      : password === ADMIN_PASSWORD;
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin', name: 'Galilee Admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );
    res.json({ success: true, token, name: 'Galilee Admin', email: ADMIN_EMAIL });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, admin: decoded });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out.' });
});

module.exports = router;