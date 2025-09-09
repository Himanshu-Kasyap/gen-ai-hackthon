const express = require('express');
const router = express.Router();

// @route   GET /api/diet
// @desc    Get diet recommendations
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get diet recommendations endpoint - coming soon!' });
});

module.exports = router;
