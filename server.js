// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Test route — confirms server is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Galilee Hotel API is running ✅' });
// });

// // Debug — log the current directory so we can see where Node is looking
// console.log('Current directory:', __dirname);
// console.log('Routes path:', path.join(__dirname, 'routes'));

// // Routes
// app.use('/api/bookings', require('./routes/bookings'));
// app.use('/api/contact',  require('./routes/contact'));

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Connect to MongoDB and start server
// const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`✅ Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });




  const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.set('trust proxy', 1);

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact',  require('./routes/contact'));


// Health check
app.get('/', (req, res) => res.send('Galilee Hotel API running ✅'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

  const requireAuth = require('./middleware/auth');

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact',  require('./routes/contact'));