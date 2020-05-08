const express = require('express');
const router = express.Router();
const userOrganization = require('../controllers/userOrganization.controller.js');

// List users in organization
router.get('/organizations/:organizationId/users', userOrganization.findAll);

// Make user admin of org
router.post('/organizations/make-admin', userOrganization.makeAdmin);

module.exports = router;
