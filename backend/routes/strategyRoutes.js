const express = require('express');
const router = express.Router();
const { getBestTimes, getFormats, generateStrategy } = require('../controllers/strategyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/best-times', protect, getBestTimes);
router.get('/formats', protect, getFormats);
router.post('/generate', protect, generateStrategy);

module.exports = router;