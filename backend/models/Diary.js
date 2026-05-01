const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:   { type: String, required: true },
  mood:      { type: String, default: '' },
  tags:      { type: [String], default: [] },
  favorited: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Diary', diarySchema);
