require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skynet_logistics';

// ==========================================
// Middleware
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Static Files — serve frontend
// ==========================================
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/app.js', express.static(path.join(__dirname, 'app.js')));

// ==========================================
// API Routes
// ==========================================
const contactsRouter = require('./routes/contacts');
const shipmentsRouter = require('./routes/shipments');
const quotesRouter = require('./routes/quotes');
const authRouter = require('./routes/auth');
const { requireAuth } = require('./middleware/auth');

// Auth routes (login, profile, change password)
app.use('/api/auth', authRouter);

// Feature routes (auth applied per-endpoint inside each router)
app.use('/api/contacts', contactsRouter);
app.use('/api/shipments', shipmentsRouter);
app.use('/api/quotes', quotesRouter);

// ==========================================
// Page Routes
// ==========================================

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Admin dashboard (auth check happens client-side via JS)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// 404 Handler
// ==========================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ==========================================
// Global Error Handler
// ==========================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.'
  });
});

// ==========================================
// Database Connection & Server Start
// ==========================================
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${MONGODB_URI}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Skynet Global Logistics server running on http://localhost:${PORT}`);
      console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin`);
      console.log(`📡 API base: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('   Make sure MongoDB is running on your machine.');
    process.exit(1);
  });

module.exports = app;
