const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller.js');

// Create a new user
router.post('/user', user.create);

// Retrieve all user
router.get('/user', user.findAll);

// Retrieve a single user with noteId
router.get('/user/:userId', user.findOne);

// Update a user with noteId
router.put('/user/:userId', user.update);

// Delete a user with noteId
router.delete('/user/:userId', user.delete);

module.exports = router;