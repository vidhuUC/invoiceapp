const mongoose = require('mongoose');

// Customer model schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Create and export the Customer model
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;