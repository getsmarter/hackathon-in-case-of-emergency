const express = require('express');
const router = express.Router();
const Team = require('../controllers/team.controller.js');

// Create a new team
router.post('/team', Team.create);

// Retrieve all team
router.get('/team', Team.findAll);

// Retrieve a single team with noteId
router.get('/team/:teamId', Team.findOne);

// Update a team with noteId
router.put('/team/:teamId', Team.update);

// Delete a team with noteId
router.delete('/team/:teamId', Team.delete);

module.exports = router;