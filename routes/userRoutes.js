const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Sign Up
router.post('/signup', UserController.signup);

// Log In
router.get('/login', UserController.login);

module.exports = router;
