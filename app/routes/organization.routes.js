const express = require('express');
const router = express.Router();
const organization = require('../controllers/organization.controller.js');

// Create new organization
router.post('/organizations', organization.create);

// List organizations
router.get('/organizations', organization.findAll);

// Retrieve a single organization
router.get('/organization/:organizationId', organization.findOne);

// Update an organization
router.put('/organization/:organizationId', organization.update);

// Delete an organization
router.delete('/organization/:organizationId', organization.delete);

module.exports = router;
