const express = require('express');
const {
  getAllBuildings,
  createBuilding,
  updateBuilding,
} = require('../controllers/buildingController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Get all buildings (requires roleId >= 0)
router.get('/', authenticate, getAllBuildings);

// Create a new building (requires roleId > 0)
router.post('/', authenticate, createBuilding);

router.put('/:id', authenticate, updateBuilding);

module.exports = router;
