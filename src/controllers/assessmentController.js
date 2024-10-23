const Assessment = require('../models/Assessment');
const createAssessment = async (req, res) => {
  const {name, idUser, image, idBuilding, floor, item, description, level} =
    req.body;

  try {
    // Creating a new Assessment, linking it with the authenticated user (req.user)
    const newAssessment = new Assessment({
      name,
      image,
      idBuilding,
      idUser, // The authenticated user's ID from token
      floor,
      item,
      description,
      level,
    });

    const savedAssessment = await newAssessment.save();
    return res.status(201).json(savedAssessment);
  } catch (error) {
    return res.status(500).json({message: 'Error creating assessment', error});
  }
};

const getAllAssessment = async (req, res) => {
  try {
    const assessments = await Assessment.find(); // Fetch all assessments
    return res.status(200).json(assessments);
  } catch (error) {
    return res.status(500).json({message: 'Error fetching assessments', error});
  }
};

const getAssessmentById = async (req, res) => {
  const {id} = req.params; // Extract assessment ID from route params
  try {
    const assessment = await Assessment.findById(id); // Fetch assessment by ID
    if (!assessment) {
      return res.status(404).json({message: 'Assessment not found'});
    }
    return res.status(200).json(assessment);
  } catch (error) {
    return res.status(500).json({message: 'Error fetching assessment', error});
  }
};

const getAssessmentByUser = async (req, res) => {
  const {userId} = req.params; // Extract userId from route params
  try {
    const assessments = await Assessment.find({idUser: userId}); // Fetch assessments by userId
    if (!assessments.length) {
      return res
        .status(404)
        .json({message: 'No assessments found for this user'});
    }
    return res.status(200).json(assessments);
  } catch (error) {
    return res.status(500).json({message: 'Error fetching assessments', error});
  }
};

module.exports = {
  createAssessment,
  getAllAssessment,
  getAssessmentById,
  getAssessmentByUser,
};
