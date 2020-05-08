const express = require('express');
const router = express.Router();
const organization = require('../controllers/organization.controller.js');

// Create new organization
router.post('/organizations', organization.create);

// List organizations
router.get('/organizations', organization.findAll);

module.exports = router;
