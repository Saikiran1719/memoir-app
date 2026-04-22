const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  genre:       { type: String, default: '' },
  year:        { type: Number },
  rating:      { type: Number, min: 0, max: 5, default: 0 },
  watchedDate: { type: String, default: '' },
  notes:       { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);