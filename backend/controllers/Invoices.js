const Invoice = require('../models/Invoices');


// Get all invoices
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get an invoice by id
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Add an invoice
const addInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.deleteMany();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id);
        res.status(200).json(invoice);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllInvoices,
    getInvoiceById,
    addInvoice,
    deleteAllInvoices,
    deleteInvoiceById,
};