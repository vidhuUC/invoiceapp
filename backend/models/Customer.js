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

// Dummy data for testing
const customers= [
  {
    name: 'John Doe',
    email: 'test@test',
    phone: '1234567890',
    address: '123 Main St 12345',
  },
  {
    name: 'Sarah Smith',
    email: 'test2@test',
    phone: '0987654321',
    address: '321 Main St 54321',
  },
  {
    name: 'Scott Johnson',
    email: 'test3@test',
    phone: '1230984567',
    address: '123 Main St 12345',
  },
  {
    name: 'Jane Doe II',
    email: 'test4@test',
    phone: '1234567890',
    address: '123 Main St 12345',
  }
]

const test = new Customer(customers);