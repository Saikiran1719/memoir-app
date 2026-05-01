const mongoose = require('mongoose');

const webSeriesSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true },
  genre:     { type: String, default: '' },
  platform:  { type: String, default: '' },
  seasons:        { type: Number },
  currentSeason:  { type: Number, default: 0 },
  currentEpisode: { type: Number, default: 0 },
  status:         { type: String, enum: ['Watching','Completed','Paused','Want to Watch'], default: 'Watching' },
  rating:         { type: Number, min: 0, max: 5, default: 0 },
  notes:          { type: String, default: '' },
  tags:           { type: [String], default: [] },
  favorited:      { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('WebSeries', webSeriesSchema);