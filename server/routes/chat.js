const express = require('express');
const router = express.Router();

// @route   POST /api/chat
// @desc    Process chat message
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'AI chat endpoint - coming soon!' });
});

// @route   GET /api/chat/history
// @desc    Get chat history
// @access  Private
router.get('/history', (req, res) => {
  res.json({ message: 'Chat history endpoint - coming soon!' });
});

module.exports = router;
