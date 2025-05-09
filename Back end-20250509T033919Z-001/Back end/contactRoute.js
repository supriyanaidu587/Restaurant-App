const express = require('express');
const ContactForm = require('../models/Contact');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const newContactForm = new ContactForm({
    name,
    email,
    message,
  });

  try {
    await newContactForm.save();
    res.status(200).json({ success: true, message: 'Message received successfully!' });
  } catch (err) {
    console.error('Error saving contact form:', err);
    res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

module.exports = router;
