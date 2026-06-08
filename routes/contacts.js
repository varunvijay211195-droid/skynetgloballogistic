const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { validateContact, validateObjectId } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// POST /api/contacts — Submit a new contact message (PUBLIC)
router.post('/', validateContact, async (req, res) => {
  try {
    const { fullName, company, email, phone, message } = req.body;

    const contact = await Contact.create({
      fullName,
      company,
      email,
      phone,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Our team will contact you shortly.',
      data: { id: contact._id }
    });
  } catch (err) {
    console.error('Contact creation error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// GET /api/contacts — List all contacts (ADMIN PROTECTED)
router.get('/', requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts, count: contacts.length });
  } catch (err) {
    console.error('Contacts fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
  }
});

// PATCH /api/contacts/:id — Update contact status (ADMIN PROTECTED)
router.patch('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const { status } = req.body;

    if (status && !['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    console.error('Contact update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update contact.' });
  }
});

// DELETE /api/contacts/:id — Delete a contact (ADMIN PROTECTED)
router.delete('/:id', requireAuth, validateObjectId, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    res.json({ success: true, message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('Contact delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete contact.' });
  }
});

module.exports = router;
