const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Movie = require('../models/Movie');

// GET all movies for user
router.get('/', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ADD movie
router.post('/', auth, async (req, res) => {
  try {
    const movie = await Movie.create({ ...req.body, userId: req.userId });
    res.status(201).json(movie);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// UPDATE movie
router.put('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body, { new: true }
    );
    if (!movie) return res.status(404).json({ message: 'Not found' });
    res.json(movie);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE movie
router.delete('/:id', auth, async (req, res) => {
  try {
    await Movie.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;