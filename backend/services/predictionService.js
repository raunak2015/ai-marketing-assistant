const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

const predictionService = {
  calculateViralityScore: async (content) => {
    try {
      // Call ML service
      const response = await axios.post(`${ML_SERVICE_URL}/predict`, content);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('ML service returned error');
    } catch (error) {
      console.error('ML service unavailable, using fallback:', error.message);
      // Fallback to rule-based scoring
      return predictionService.fallbackScore(content);
    }
  },

  fallbackScore: (content) => {
    let score = 50;
    if (content.title?.length > 30 && content.title?.length < 70) score += 15;
    if (content.hashtags?.length >= 3) score += 10;
    if (content.hasEmoji) score += 5;
    if (content.hasQuestion) score += 10;
    if (content.hasCallToAction) score += 10;
    if (content.platform === 'TikTok' || content.platform === 'Instagram') score += 10;
    score = Math.min(score, 100);
    
    const predictedReach = 10000 * (score / 50);
    return {
      viralityScore: score,
      predictedReach: Math.floor(predictedReach),
      predictedEngagement: {
        likes: Math.floor(predictedReach * 0.06 * (score / 100)),
        comments: Math.floor(predictedReach * 0.015 * (score / 100)),
        shares: Math.floor(predictedReach * 0.025 * (score / 100))
      },
      suggestions: [],
      confidence: score > 70 ? 'high' : score > 40 ? 'medium' : 'low'
    };
  }
};

module.exports = predictionService;