const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    unique: true,
    required: true,
  },
  guest: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  room: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  nights: { type: Number, required: true },
  amount: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked-in', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);