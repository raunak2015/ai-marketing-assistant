const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // YouTube
  getYouTubeTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/youtube/trending`);
    return res.json();
  },
  // Twitter (mock, but kept for compatibility)
  getTwitterTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/twitter/trending`);
    return res.json();
  },
  // Instagram (mock)
  getInstagramTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/instagram/trending`);
    return res.json();
  },
  // LinkedIn (mock)
  getLinkedInTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/linkedin/trending`);
    return res.json();
  },
  // TikTok (mock)
  getTikTokTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/tiktok/trending`);
    return res.json();
  },
  // Analytics
  getAnalyticsOverview: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/overview`);
    return res.json();
  },
  // Content generation
  generateContent: async (topic, platform, goal) => {
    const res = await fetch(`${API_BASE_URL}/content/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, platform, goal })
    });
    return res.json();
  },
  // Virality prediction
  predictVirality: async (contentData) => {
    const res = await fetch(`${API_BASE_URL}/content/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    });
    return res.json();
  },
  // Strategy
  getBestPostingTimes: async () => {
    const res = await fetch(`${API_BASE_URL}/strategy/best-times`);
    return res.json();
  },
  getFormatRecommendations: async () => {
    const res = await fetch(`${API_BASE_URL}/strategy/formats`);
    return res.json();
  }
};

export default api;