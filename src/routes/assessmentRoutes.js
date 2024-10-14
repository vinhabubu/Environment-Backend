const express = require('express');
const {
  createAssessment,
  getAllAssessment,
  getAssessmentById,
  getAssessmentByUser,
} = require('../controllers/assessmentController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Get all buildings (requires roleId >= 0)
router.get('/', authenticate, getAllAssessment);

router.get('/:id', authenticate, getAssessmentById);

router.get('/user/:userId', authenticate, getAssessmentByUser);

// Create a new building (requires roleId > 0)
router.post('/', authenticate, createAssessment);

module.exports = router;
