require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

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
// DB connection state
// ==========================================
let dbConnected = false;

// Middleware: guard API routes when DB is unavailable
const requireDb = (req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. API is currently unavailable.'
    });
  }
  next();
};

// ==========================================
// API Routes (guarded by DB availability)
// ==========================================
const contactsRouter = require('./routes/contacts');
const shipmentsRouter = require('./routes/shipments');
const quotesRouter = require('./routes/quotes');
const authRouter = require('./routes/auth');

app.use('/api/auth', requireDb, authRouter);
app.use('/api/contacts', requireDb, contactsRouter);
app.use('/api/shipments', requireDb, shipmentsRouter);
app.use('/api/quotes', requireDb, quotesRouter);

// Health check — always available
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'online',
    db: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

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

// Admin dashboard
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
// Start Server (always — DB is optional)
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Skynet Global Logistics server running on http://localhost:${PORT}`);
  console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`📡 API base: http://localhost:${PORT}/api`);
});

// ==========================================
// Attempt MongoDB Connection (non-blocking)
// ==========================================
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      dbConnected = true;
      console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
      dbConnected = false;
      console.warn('⚠️  MongoDB connection failed — running in static-only mode.');
      console.warn('   API routes requiring DB will return 503.');
      console.warn('   Error:', err.message);
    });
} else {
  console.log('ℹ️  No MONGODB_URI set — running in static-only mode (DB disabled).');
  console.log('   Frontend is fully served. API routes requiring DB will return 503.');
}

module.exports = app;
