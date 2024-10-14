const express = require('express');
const {register, login} = require('../controllers/authController'); // Import controller functions

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
