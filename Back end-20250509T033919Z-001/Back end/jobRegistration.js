const express = require('express');
const JobRegistration = require('../models/JobRegistration');
const router = express.Router();

router.post('/submit', async (req, res) => {
  const { name, phoneNumber, age, role, branchLocation } = req.body;

  try {
    const jobRegistration = new JobRegistration({
      name,
      phoneNumber,
      age,
      role,
      branchLocation,
    });

    await jobRegistration.save();

    res.status(201).json({
      message: 'Job registration submitted successfully!',
      jobRegistration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
