const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup.controller.js');

// Create / Sign up a user
router.post('/signup', signup.create);

module.exports = router;
