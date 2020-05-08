const express = require('express');
const router = express.Router();
const alert = require('../controllers/alert.controller.js');

// Create a new alert
router.post('/alert', alert.create);

// Retrieve all alert
router.get('/alert', alert.findAll);

// Retrieve a single alert with noteId
router.get('/alert/:alertId', alert.findOne);

// Update a alert with noteId
router.put('/alert/:alertId', alert.update);

// Delete a alert with noteId
router.delete('/alert/:alertId', alert.delete);

module.exports = router;