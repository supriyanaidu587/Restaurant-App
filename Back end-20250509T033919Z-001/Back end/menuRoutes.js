const express = require('express');
const Menu = require('../models/menuItem');
const router = express.Router();

router.get('/getmenuitems', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found' });
    }
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ message: 'Server error fetching menu items' });
  }
});

router.get('/menuRoutes/all', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

router.post('/menuRoutes/update', async (req, res) => {
  const { name, price, image, _id } = req.body;

  try {
    let menuItem;
    if (_id) {
      menuItem = await Menu.findByIdAndUpdate(_id, { name, price, image }, { new: true });
    } else {
      menuItem = new Menu({ name, price, image });
      await menuItem.save();
    }

    res.json({ message: 'Menu updated successfully', menuItem });
  } catch (err) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

router.delete('/menuItems/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (menuItem) {
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

module.exports = router;
