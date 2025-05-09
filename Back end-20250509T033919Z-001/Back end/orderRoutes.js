const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/api/place-order', async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrder = {
      items,
      totalAmount,
      date: new Date(),
    };

    user.orders.push(newOrder);

    await user.save();

    res.status(200).json({ message: 'Order placed successfully', user });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

module.exports = router;
