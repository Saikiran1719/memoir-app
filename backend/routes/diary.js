const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Diary = require('../models/Diary');

router.get('/', auth, async (req, res) => {
  try {
    const entries = await Diary.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const entry = await Diary.create({
      content: req.body.content,
      mood:    req.body.mood || '',
      tags:    req.body.tags || [],
      userId:  req.userId
    });
    res.status(201).json(entry);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const update = {};
    if (req.body.content   !== undefined) update.content   = req.body.content;
    if (req.body.mood      !== undefined) update.mood      = req.body.mood;
    if (req.body.tags      !== undefined) update.tags      = req.body.tags;
    if (req.body.favorited !== undefined) update.favorited = req.body.favorited;
    const entry = await Diary.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      update, { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Diary.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;