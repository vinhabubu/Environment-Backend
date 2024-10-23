const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Middleware to authenticate the JWT token and check the user's role
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .json({message: 'Access denied. No token provided.'});
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({message: 'Invalid token error'});
  }
};

module.exports = authenticate;
