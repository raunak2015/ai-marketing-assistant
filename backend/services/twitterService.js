const axios = require('axios');

const twitterService = {
  getTrendingTopics: async () => {
    // Mock data (since RapidAPI key may be limited)
    return [
      { topic: '#AIArt', volume: '2.4M', growth: '+142%', category: 'Tech' },
      { topic: '#CreatorEconomy', volume: '1.8M', growth: '+98%', category: 'Business' },
      { topic: '#ViralHacks', volume: '1.2M', growth: '+76%', category: 'Marketing' },
      { topic: '#GrowthStrategy', volume: '890K', growth: '+54%', category: 'Business' },
      { topic: '#ContentCreator', volume: '756K', growth: '+43%', category: 'Creator' }
    ];
  }
};

module.exports = twitterService;
