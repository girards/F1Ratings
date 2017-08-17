var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var trackSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  location: String,
  length: Number,
  turn: Number,
}, schemaOptions);

var Track = mongoose.model('Track', trackSchema);

module.exports = Track;
