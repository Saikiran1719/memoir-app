const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:  { type: String, required: true },
  author: { type: String, default: '' },
  status: { type: String, enum: ['Reading','Completed','Paused','Want to Read'], default: 'Reading' },
  pages:  { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  notes:  { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);