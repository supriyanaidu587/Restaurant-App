const express = require('express');
const Branch = require('../models/Branch');
const router = express.Router();

router.get('/getbranchcollection', async (req, res) => {
  try {
    const branches = await Branch.find();
    if (!branches || branches.length === 0) {
      return res.status(404).json({ message: 'No branches found' });
    }
    res.json(branches);
  } catch (err) {
    console.error('Error fetching branches:', err);
    res.status(500).json({ message: 'Server error fetching branches' });
  }
});

module.exports = router;
