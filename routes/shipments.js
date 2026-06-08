const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const { validateShipment, validateObjectId } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// GET /api/shipments/track/:code — Public: Look up shipment by tracking code
router.get('/track/:code', async (req, res) => {
  try {
    const code = req.params.code.trim().toUpperCase();
    const shipment = await Shipment.findOne({ trackingCode: code });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found. Please check your tracking code and try again.'
      });
    }

    // Sort events by timestamp descending (newest first)
    const sortedEvents = shipment.events.sort((a, b) => b.timestamp - a.timestamp);

    res.json({
      success: true,
      data: {
        trackingCode: shipment.trackingCode,
        status: shipment.status,
        origin: shipment.origin,
        destination: shipment.destination,
        events: sortedEvents.map(ev => ({
          title: ev.title,
          desc: ev.description,
          time: ev.timestamp.toLocaleDateString('en-US', {
            month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
          }),
          active: ev.isActive
        }))
      }
    });
  } catch (err) {
    console.error('Shipment track error:', err);
    res.status(500).json({ success: false, message: 'Failed to track shipment.' });
  }
});

// GET /api/shipments — Admin: List all shipments (ADMIN PROTECTED)
router.get('/', requireAuth, async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: shipments, count: shipments.length });
  } catch (err) {
    console.error('Shipments fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch shipments.' });
  }
});

// POST /api/shipments — Admin: Create a new shipment (ADMIN PROTECTED)
router.post('/', requireAuth, validateShipment, async (req, res) => {
  try {
    const { trackingCode, status, origin, destination, events } = req.body;

    // Generate tracking code if not provided
    let code = trackingCode;
    if (!code) {
      const random = Math.floor(100000 + Math.random() * 900000);
      code = `SKY-${random}`;
    }

    const shipment = await Shipment.create({
      trackingCode: code,
      status: status || 'Information Received',
      origin,
      destination,
      events: events || [{
        title: 'Shipment Information Received',
        description: 'Shipment data processed, booking confirmed',
        timestamp: new Date(),
        isActive: true
      }]
    });

    res.status(201).json({
      success: true,
      message: `Shipment ${shipment.trackingCode} created successfully.`,
      data: shipment
    });
  } catch (err) {
    // Handle duplicate tracking code
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A shipment with this tracking code already exists.'
      });
    }
    console.error('Shipment creation error:', err);
    res.status(500).json({ success: false, message: 'Failed to create shipment.' });
  }
});

// PATCH /api/shipments/:id — Admin: Update shipment status or add event (ADMIN PROTECTED)
router.patch('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const { status, addEvent } = req.body;

    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found.' });
    }

    if (status) shipment.status = status;

    // Add a new tracking event
    if (addEvent) {
      // Deactivate all previous active events
      shipment.events.forEach(ev => { ev.isActive = false; });

      shipment.events.push({
        title: addEvent.title,
        description: addEvent.description,
        timestamp: addEvent.timestamp || new Date(),
        isActive: true
      });
    }

    await shipment.save();
    res.json({ success: true, data: shipment });
  } catch (err) {
    console.error('Shipment update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update shipment.' });
  }
});

// DELETE /api/shipments/:id — Admin: Delete a shipment (ADMIN PROTECTED)
router.delete('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found.' });
    }

    res.json({ success: true, message: `Shipment ${shipment.trackingCode} deleted.` });
  } catch (err) {
    console.error('Shipment delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete shipment.' });
  }
});

module.exports = router;
