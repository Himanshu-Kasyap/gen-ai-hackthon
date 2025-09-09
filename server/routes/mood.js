const express = require('express');
const router = express.Router();

// @route   GET /api/mood
// @desc    Get mood history
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get mood history endpoint - coming soon!' });
});

// @route   POST /api/mood
// @desc    Log mood entry
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Mood entry endpoint - coming soon!' });
});

module.exports = router;
