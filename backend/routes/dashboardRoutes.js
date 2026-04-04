const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDashboardData, refreshDashboardData } = require('../controllers/dashboardController');

router.get('/', protect, getDashboardData);
router.post('/refresh', protect, refreshDashboardData);

module.exports = router;
