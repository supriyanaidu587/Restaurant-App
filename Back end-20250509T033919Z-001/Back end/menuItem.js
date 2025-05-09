const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }, 
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
