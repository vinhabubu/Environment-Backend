const {Schema, model} = require('../databases/mongoose');

const AssessmentSchema = new Schema({
  name: {
    type: String,
  },
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
  item: {
    type: String,
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
