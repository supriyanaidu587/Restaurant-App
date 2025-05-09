const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  phoneNumber: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  orders: [
    {
      items: Array, 
      totalAmount: Number, 
      date: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
