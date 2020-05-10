const express = require('express');
const router = express.Router();
const team = require('../controllers/team.controller.js');

// Create a new team
router.post('/teams', team.create);

// Retrieve all team
router.get('/teams/organizations/:organizationId', team.findAll);

// Retrieve a single team
router.get('/teams/:teamId', team.findOne);

// Update a team
router.put('/teams/:teamId', team.update);

// Delete a team
router.delete('/teams/:teamId', team.delete);

module.exports = router;
