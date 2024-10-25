const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Import the model

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({message: 'Server error: ' + error.message});
  }
});

// GET /api/questions/:id - Get a specific question by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({message: 'Server error: ' + error.message});
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

router.put('/update/:id', async (req, res) => {
  const {id} = req.params;
  const {username, password, email , isBlock} = req.body;

  // console.log(username, password , email)

  try {
    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    // Update user fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (isBlock) user.isBlock = isBlock;


    // If the password is provided, hash it before updating
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    // Update the updatedAt field
    user.updatedAt = Date.now();

    // Save the updated user
    await user.save();

    return res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({message: 'Server error', error});
  }
});

module.exports = router;
