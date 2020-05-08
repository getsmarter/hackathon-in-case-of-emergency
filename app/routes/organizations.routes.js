const express = require('express');
const router = express.Router();
const organization = require('../controllers/organization.controller.js');

// Create a new Note
router.post('/organizations', organization.create);

// Retrieve all Notes
router.get('/organizations', organization.findAll);

// Retrieve a single Note with noteId
router.get('/organizations/:organizationId', organization.findOne);

// Update a Note with noteId
router.put('/organizations/:organizationId', organization.update);

// Delete a Note with noteId
router.delete('/organizations/:organizationId', organization.delete);

module.exports = router;