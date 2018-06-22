const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// rum schema model
const rumSchema = new Schema({
  rumName: {
    type: String,
    trim: true,
  },
  distillery: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  style: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, {
  usePushEach: true,
});

const Rum = mongoose.model('Rum', rumSchema);

module.exports = { Rum };
