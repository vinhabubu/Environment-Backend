const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Register function
const register = async (req, res) => {
  const {username, password, email} = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({message: 'Server error'});
    }

    // Create a JWT token
    const token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    return res.status(201).json({user: savedUser, token: token});
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

// Login function
const login = async (req, res) => {
  const {email, password} = req.body;
  // console.log(email,password)

  try {
    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // Create a JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    return res.status(200).json({user: user, token: token, password: password});
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

module.exports = {register, login};
