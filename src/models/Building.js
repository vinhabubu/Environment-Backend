const {Schema, model} = require('../databases/mongoose');

const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amountFloor: {
    type: Number,
  },
  idQr: {
    type: String,
    unique: true,
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

module.exports = model('Building', BuildingSchema);
