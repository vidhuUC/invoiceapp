const express = require('express')
const router = express.Router()
const Customer = require('../controllers/Customer')

router.get('/customers', Customer.getAllCustomers)
router.post('/customers', Customer.addCustomer)
router.delete('/customers', Customer.deleteAllCustomers)

module.exports = router

