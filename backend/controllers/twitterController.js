const twitterService = require('../services/twitterService');

exports.getTrending = async (req, res) => {
  try {
    const trends = await twitterService.getTrendingTopics();
    res.json({ success: true, data: trends });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
