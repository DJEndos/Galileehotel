const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const protect = require('../middleware/authMiddleware');

// GET /api/reservations — get all reservations
router.get('/', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reservations/:id — look up a single reservation by reservationId
router.get('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ reservationId: req.params.id });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/reservations/:id/status — update reservation status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findOneAndUpdate(
      { reservationId: req.params.id },
      { status },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;