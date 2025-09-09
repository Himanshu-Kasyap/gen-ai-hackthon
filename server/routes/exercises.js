const express = require('express');
const router = express.Router();

// @route   GET /api/exercises
// @desc    Get all exercises
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get exercises endpoint - coming soon!' });
});

// @route   POST /api/exercises/complete
// @desc    Mark exercise as completed
// @access  Private
router.post('/complete', (req, res) => {
  res.json({ message: 'Exercise completion endpoint - coming soon!' });
});

module.exports = router;
