const mongoose = require('mongoose');


const invoiceSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    notes:{
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    });

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;

