const Building = require('../models/Building');

// Get all buildings
const getAllBuildings = async (req, res) => {
  try {
    if (req.user.roleId < 0) {
      return res.status(403).json({message: 'Access denied'});
    }

    const buildings = await Building.find();
    return res.status(200).json(buildings);
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

// Create a new building
const createBuilding = async (req, res) => {
  try {
    if (req.user.roleId <= 0) {
      return res
        .status(403)
        .json({message: 'Insufficient privileges to create a building'});
    }

    const {name, amountFloor,idQr} = req.body;

    const newBuilding = new Building({
      name,
      amountFloor,
      idQr
    });

    await newBuilding.save();
    return res
      .status(201)
      .json({message: 'Building created successfully', building: newBuilding});
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

module.exports = {getAllBuildings, createBuilding};
