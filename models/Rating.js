var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var ratingSchema = new mongoose.Schema({
  rate: Number,
  race: Schema.ObjectId,
  user: Schema.ObjectId,
}, schemaOptions);

var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
