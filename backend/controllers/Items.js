const Item = require('../models/Items');

// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Add an item
const addItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    getAllItems,
    addItem,
};

