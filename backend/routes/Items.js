const express = require('express');
const router = express.Router();
const Item = require('../controllers/Items');

router.get('/items', Item.getAllItems);
router.post('/items', Item.addItem);
router.delete('/items', Item.deleteAllItems);

module.exports = router;