const express = require('express');
const router = express.Router();
const { generate, predict } = require('../controllers/contentController');

// Content generation and prediction are available without authentication,
// so GrowthMaps Studio works directly from the frontend.
router.post('/generate', generate);
router.post('/predict', predict);

module.exports = router;