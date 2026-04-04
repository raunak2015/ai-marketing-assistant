const geminiService = require('../services/geminiService');
const predictionService = require('../services/predictionService');

exports.generate = async (req, res) => {
  try {
    const { topic, platform, goal } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic required' });
    }
    const generated = await geminiService.generateContent(topic, platform, goal);
    res.json({ success: true, data: generated });
  } catch (error) {
    console.error('Generate error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.predict = async (req, res) => {
  try {
    const { title, description, hashtags, platform, hasEmoji, hasQuestion, hasCallToAction } = req.body;
    const content = { title, description, hashtags, platform, hasEmoji, hasQuestion, hasCallToAction };
    
    const prediction = await predictionService.calculateViralityScore(content);
    
    res.json({ success: true, data: prediction });
  } catch (error) {
    console.error('Predict error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};