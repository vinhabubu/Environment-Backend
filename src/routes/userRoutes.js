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
  const {username, password, email, isBlock} = req.body;

  try {
    // Prepare the fields to update
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (typeof isBlock === 'boolean') updateFields.isBlock = isBlock;

    // If password is provided, hash it before updating
    if (password) {
      const saltRounds = 10;
      updateFields.password = await bcrypt.hash(password, saltRounds);
    }

    // Update the updatedAt field
    updateFields.updatedAt = Date.now();

    // Use findByIdAndUpdate to directly update in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {$set: updateFields},
      {new: true}, // returns the updated document
    );

    console.log(updatedUser, 'updatedUser');
    if (!updatedUser) {
      return res.status(404).json({message: 'User not found'});
    }

    return res
      .status(200)
      .json({message: 'User updated successfully', user: updatedUser});
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({message: 'Server error', error});
  }
});

module.exports = router;
