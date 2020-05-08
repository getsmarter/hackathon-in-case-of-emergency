const express = require('express');
const router = express.Router();
const Team = require('../controllers/team.controller.js');

// Create a new team
router.post('/team', Team.create);

// Retrieve all team
router.get('/team', Team.findAll);

// Retrieve a single team
router.get('/team/:teamId', Team.findOne);

// Update a team
router.put('/team/:teamId', Team.update);

// Delete a team
router.delete('/team/:teamId', Team.delete);

module.exports = router;