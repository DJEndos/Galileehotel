const router  = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.status(201).json({ success: true, msg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;

const requireAuth = require('../middleware/auth');

// Public — guests can POST messages
router.post('/', async (req, res) => {  });

// Protected — only admin can GET messages
router.get('/', requireAuth, async (req, res) => {  });