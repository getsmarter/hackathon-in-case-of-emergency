const express = require('express');
const router = express.Router();
const EmergencyContacts = require('../controllers/emergencyContacts.controller.js');

// Create a new emergencycontacts
router.post('/emergencycontacts', EmergencyContacts.create);

// Retrieve all emergencycontacts
router.get('/emergencycontacts', EmergencyContacts.findAll);

// Retrieve a single emergencycontacts with noteId
router.get('/emergencycontacts/:emergencycontactsId', EmergencyContacts.findOne);

// Update a emergencycontacts with noteId
router.put('/emergencycontacts/:emergencycontactsId', EmergencyContacts.update);

// Delete a emergencycontacts with noteId
router.delete('/emergencycontacts/:emergencycontactsId', EmergencyContacts.delete);

module.exports = router;