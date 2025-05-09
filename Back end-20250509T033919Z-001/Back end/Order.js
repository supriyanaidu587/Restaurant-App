const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderMode: {
    type: String,
    enum: ['online', 'offline'],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: function () {
      return this.orderMode === 'online'; 
    },
  },
  tableNumber: {
    type: Number,
    required: function () {
      return this.orderMode === 'offline'; 
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);