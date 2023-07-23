const express = require('express');
const router = express.Router();
const Invoice = require('../controllers/Invoices');

router.get('/invoices', Invoice.getAllInvoices);
router.get('/invoices/:id', Invoice.getInvoiceById);
router.post('/invoices', Invoice.addInvoice);
router.delete('/invoices/:id', Invoice.deleteInvoiceById);

module.exports = router;