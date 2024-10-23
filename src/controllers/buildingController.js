const Building = require('../models/Building');
const Assessment = require('../models/Assessment');

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

    const {name, amountFloor, idQr} = req.body;

    const newBuilding = new Building({
      name,
      amountFloor,
      idQr,
    });

    await newBuilding.save();
    return res
      .status(201)
      .json({message: 'Building created successfully', building: newBuilding});
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

const updateBuilding = async (req, res) => {
  try {
    if (req.user.roleId <= 0) {
      return res
        .status(403)
        .json({message: 'Insufficient privileges to create a building'});
    }

    const {id} = req.params;
    const {name, amountFloor, idQr} = req.body;

    const building = await Building.findById(id);

    if (!building) {
      return res.status(404).json({message: 'Buildings not found'});
    }

    if (name) building.name = name;
    if (amountFloor) building.amountFloor = amountFloor;
    if (idQr) building.idQr = idQr;

    if (name) {
       await Assessment.updateMany(
        { idBuilding : id }, // Matching condition
        { $set: { name: name, updatedAt: Date.now() } } // Updating name and updatedAt
      );
    }
    await building.save();
    return res
      .status(201)
      .json({message: 'Building created successfully', building: building});
  } catch (error) {
    return res.status(500).json({message: 'Server error'});
  }
};

module.exports = {getAllBuildings, createBuilding, updateBuilding};
