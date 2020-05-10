const express = require('express');
const router = express.Router();
const organization = require('../controllers/organization.controller.js');

// Create new organization
router.post('/organizations', organization.create);

// List organizations
router.get('/organizations', organization.findAll);

// Retrieve a single organization
router.get('/organizations/:organizationId', organization.findOne);

// Update an organization
router.put('/organizations/:organizationId', organization.update);

// Delete an organization
router.delete('/organizations/:organizationId', organization.delete);

module.exports = router;
