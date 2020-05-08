const express = require('express');
const router = express.Router();
const organization = require('../controllers/organization.controller.js');

// Create a new Note
router.post('/organization', organization.create);

// Retrieve all Notes
router.get('/organization', organization.findAll);

// Retrieve a single Note with noteId
router.get('/organization/:organizationId', organization.findOne);

// Update a Note with noteId
router.put('/organization/:organizationId', organization.update);

// Delete a Note with noteId
router.delete('/organization/:organizationId', organization.delete);

module.exports = router;