const router  = require('express').Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

module.exports = router;

const requireAuth = require('../middleware/auth');

// Public — guests can POST bookings
router.post('/', async (req, res) => { });

// Protected — only admin can GET all bookings
router.get('/', requireAuth, async (req, res) => { });

// Protected — only admin can update status
router.patch('/:id', requireAuth, async (req, res) => { });