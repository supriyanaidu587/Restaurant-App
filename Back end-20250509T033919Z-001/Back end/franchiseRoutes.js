const express = require('express');
const Franchise = require('../models/franchise');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { franchiseName, phoneNumber, location, amount, noOfPersons } = req.body;

  try {
    let franchise = await Franchise.findOne({ franchiseName });
    if (franchise) {
      return res.status(400).json({ message: 'Franchise already exists' });
    }

    franchise = new Franchise({
      franchiseName,
      phoneNumber,
      location,
      amount,
      noOfPersons
    });

    await franchise.save();

    res.status(201).json({ message: 'Franchise registered successfully', franchise });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
