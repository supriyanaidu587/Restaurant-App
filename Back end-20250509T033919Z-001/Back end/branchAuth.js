const express = require('express');
const bcrypt = require('bcryptjs');
const Branch = require('../models/Branch');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/register', [
  body('branchUsername').notEmpty().withMessage('Branch Username is required'),
  body('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('numOfEmployees').isInt().withMessage('Number of employees must be a number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { branchUsername, phoneNumber, password, numOfEmployees, location } = req.body;

  try {
    let branch = await Branch.findOne({ branchUsername });
    if (branch) {
      return res.status(400).json({ message: 'Branch username already exists' });
    }

    branch = new Branch({
      branchUsername,
      phoneNumber,
      password,
      numOfEmployees,
      location,
    });

    const salt = await bcrypt.genSalt(10);
    branch.password = await bcrypt.hash(password, salt);

    await branch.save();

    req.session.branch = {
      id: branch.id,
      branchUsername: branch.branchUsername,
      phoneNumber: branch.phoneNumber,
    };

    res.json({ message: 'Branch created and logged in successfully', branch });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', [
  body('branchUsername').notEmpty().withMessage('Branch Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { branchUsername, password } = req.body;

  try {
    let branch = await Branch.findOne({ branchUsername });
    if (!branch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, branch.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.session.branch = {
      id: branch.id,
      branchUsername: branch.branchUsername,
      phoneNumber: branch.phoneNumber,
    };

    res.json({ message: 'Login successful', branch });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
