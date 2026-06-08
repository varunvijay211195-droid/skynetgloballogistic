const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  freightType: {
    type: String,
    required: true,
    enum: ['air', 'ocean-fcl', 'ocean-lcl', 'land']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0.1, 'Weight must be greater than 0']
  },
  volume: {
    type: Number,
    required: [true, 'Volume is required'],
    min: [0.1, 'Volume must be greater than 0']
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'converted'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);
