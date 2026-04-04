const youtubeService = require('../services/youtubeService');

exports.getTrending = async (req, res) => {
  try {
    const { region = 'IN', limit = 20 } = req.query;
    const videos = await youtubeService.getTrendingVideos(region, parseInt(limit));
    res.json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
