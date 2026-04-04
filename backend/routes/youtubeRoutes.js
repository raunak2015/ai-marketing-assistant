const express = require('express');
const router = express.Router();
const { getTrending } = require('../controllers/youtubeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/trending', protect, getTrending);

module.exports = router;
