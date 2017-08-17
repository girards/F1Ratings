var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var raceSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  rating: Number,
  vote_number: Number,
  year: Number,
  track: Schema.ObjectId,
  video_url_id: String,
  thumbnail_url: String,
}, schemaOptions);

var Race = mongoose.model('Race', raceSchema);

module.exports = Race;
