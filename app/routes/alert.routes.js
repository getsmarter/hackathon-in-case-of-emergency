const express = require('express');
const router = express.Router();
const alert = require('../controllers/alert.controller.js');

// Create a new noteId
router.post('/alerts', alert.create);

// Retrieve all v
router.get('/alerts', alert.findAll);

// Retrieve a single alert with noteId
router.get('/alerts/:alertId', alert.findOne);

// Update a alert with noteId
router.put('/alerts/:alertId', alert.update);

// Delete a alert with noteId
router.delete('/alerts/:alertId', alert.delete);

///organizations/alerts/checkin
router.post('/alerts/checkin', alert.createCheckin);

// Get all checkins for alert
router.get('/alerts/checkin/:alertId', alert.getAllCheckinsForIncident);

// Retrieve a single alert with organizationid
router.get('/alerts/organizations/:organizationid', alert.findAlertsForOrganization);

module.exports = router;