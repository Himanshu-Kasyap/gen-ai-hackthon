const express = require('express');
const router = express.Router();

// @route   GET /api/games
// @desc    Get games data
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get games endpoint - coming soon!' });
});

// @route   POST /api/games/score
// @desc    Save game score
// @access  Private
router.post('/score', (req, res) => {
  res.json({ message: 'Save game score endpoint - coming soon!' });
});

module.exports = router;
