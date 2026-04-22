const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WebSeries = require('../models/WebSeries');

router.get('/', auth, async (req, res) => {
  try {
    const series = await WebSeries.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(series);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const series = await WebSeries.create({ ...req.body, userId: req.userId });
    res.status(201).json(series);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const series = await WebSeries.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body, { new: true }
    );
    if (!series) return res.status(404).json({ message: 'Not found' });
    res.json(series);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await WebSeries.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;