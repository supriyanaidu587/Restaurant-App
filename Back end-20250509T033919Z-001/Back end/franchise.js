const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  franchiseName: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  noOfPersons: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now }
});

const Franchise = mongoose.model('Franchise', franchiseSchema);

module.exports = Franchise;