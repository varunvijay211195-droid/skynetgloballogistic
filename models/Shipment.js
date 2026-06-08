const mongoose = require('mongoose');

const trackingEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const shipmentSchema = new mongoose.Schema({
  trackingCode: {
    type: String,
    required: [true, 'Tracking code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Information Received', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered'],
    default: 'Information Received'
  },
  origin: {
    type: String,
    trim: true
  },
  destination: {
    type: String,
    trim: true
  },
  events: [trackingEventSchema]
}, {
  timestamps: true
});

// Generate a tracking code if not provided
shipmentSchema.pre('save', function(next) {
  if (!this.trackingCode) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.trackingCode = `SKY-${random}`;
  }
  next();
});

module.exports = mongoose.model('Shipment', shipmentSchema);
