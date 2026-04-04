const express = require('express');
const router = express.Router();
const { register, login, googleAuth, googleCallback, getMe, connectPlatform, disconnectPlatform, getConnectedPlatforms } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/me', protect, getMe);
router.get('/connected-platforms', protect, getConnectedPlatforms);
router.post('/connect-platform', protect, connectPlatform);
router.post('/disconnect-platform', protect, disconnectPlatform);

module.exports = router;
