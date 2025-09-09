const express = require('express');
const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard data
// @access  Private
router.get('/', (req, res) => {
  // Mock dashboard data
  const dashboardData = {
    sleepScore: 8.2,
    exerciseCompletion: 75,
    moodRating: 'good',
    mindfulnessMinutes: 45,
    dailyGoal: 60,
    todaySchedule: [
      { time: '7:00 AM', activity: 'Morning Meditation' },
      { time: '8:30 AM', activity: 'Healthy Breakfast' },
      { time: '12:00 PM', activity: 'Mindful Lunch Break' },
      { time: '3:00 PM', activity: 'Stress Relief Exercise' },
      { time: '6:00 PM', activity: 'Evening Yoga' },
      { time: '9:00 PM', activity: 'Sleep Preparation' }
    ]
  };
  
  res.json(dashboardData);
});

module.exports = router;
