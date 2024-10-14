const {Schema, model} = require('../databases/mongoose');

const AssessmentSchema = new Schema({
  image: {
    type: String,
  },
  idUser: {
    type: String,
    required: true,
  },
  idBuilding: {
    type: String,
  },
  floor: {
    type: Number,
  },
  description: {
    type: String,
  },
  level: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Assessment', AssessmentSchema);
