const express = require('express');
const User = require('../models/User');
// Import the model

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: 'Server error: ' + error.message});
  }
});

// GET /api/questions/:id - Get a specific question by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({message: 'Server error: ' + error.message});
  }
});

// POST /api/questions - Create a new question
router.post('/', async (req, res) => {
  const {username, password} = req.body;

  try {
    const newUser = new User({
      username,
      password,
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({message: 'Server12 error: ' + error.message});
  }
});

module.exports = router;
