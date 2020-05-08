const express = require('express');
const router = express.Router();
const crewMember = require('../controllers/crewMember.controller.js');

// Create a new Note
router.post('/crewMember', crewMember.create);

// Retrieve all crewMember
router.get('/crewMember', crewMember.findAll);

// Retrieve a single Note with noteId
router.get('/crewMember/:noteId', crewMember.findOne);

// Update a Note with noteId
router.put('/crewMember/:noteId', crewMember.update);

// Delete a Note with noteId
router.delete('/crewMember/:noteId', crewMember.delete);

module.exports = router;