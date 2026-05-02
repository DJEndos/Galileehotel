const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullName:        { type: String, required: true },
  email:           { type: String, required: true },
  phone:           { type: String, required: true },
  checkin:         { type: Date,   required: true },
  checkout:        { type: Date,   required: true },
  guests:          { type: Number, required: true },
  roomType:        { type: String, required: true },
  specialRequests: { type: String },
  totalAmount:     { type: Number },
  paymentMethod:   { type: String, enum: ['paystack', 'stripe', 'cash'] },
  paymentStatus:   { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentRef:      { type: String },
  status:          { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);