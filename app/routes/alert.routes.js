const express = require('express');
const router = express.Router();
const alert = require('../controllers/alert.controller.js');

// Create a new alert
router.post('/alerts', alert.create);

// Retrieve all alert
router.get('/alerts', alert.findAll);

// Retrieve a single alert with noteId
router.get('/alerts/:alertId', alert.findOne);

// Update a alert with noteId
router.put('/alerts/:alertId', alert.update);

// Delete a alert with noteId
router.delete('/alerts/:alertId', alert.delete);

///organizations/alerts/checkin
router.post('/alerts/checkin', alert.createCheckin);

module.exports = router;