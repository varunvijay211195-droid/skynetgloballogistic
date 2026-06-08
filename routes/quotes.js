const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { validateQuote, validateObjectId } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// POST /api/quotes — Save a calculated quote (PUBLIC — from frontend estimator)
router.post('/', validateQuote, async (req, res) => {
  try {
    const { origin, destination, freightType, weight, volume, estimatedCost, contactEmail } = req.body;

    const quote = await Quote.create({
      origin,
      destination,
      freightType,
      weight,
      volume,
      estimatedCost,
      contactEmail: contactEmail || undefined
    });

    res.status(201).json({
      success: true,
      message: 'Quote saved successfully. Our team will review and reach out.',
      data: { id: quote._id, estimatedCost: quote.estimatedCost }
    });
  } catch (err) {
    console.error('Quote creation error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to save quote. Please try again later.'
    });
  }
});

// GET /api/quotes — Admin: List all quotes (ADMIN PROTECTED)
router.get('/', requireAuth, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, data: quotes, count: quotes.length });
  } catch (err) {
    console.error('Quotes fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch quotes.' });
  }
});

// PATCH /api/quotes/:id — Admin: Update quote status (ADMIN PROTECTED)
router.patch('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const { status } = req.body;

    if (status && !['pending', 'sent', 'converted'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found.' });
    }

    res.json({ success: true, data: quote });
  } catch (err) {
    console.error('Quote update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update quote.' });
  }
});

// DELETE /api/quotes/:id — Admin: Delete a quote (ADMIN PROTECTED)
router.delete('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found.' });
    }

    res.json({ success: true, message: 'Quote deleted successfully.' });
  } catch (err) {
    console.error('Quote delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete quote.' });
  }
});

module.exports = router;
