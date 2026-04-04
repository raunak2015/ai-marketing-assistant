const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get stored auth token
const getToken = () => localStorage.getItem('viralPulseToken');

// Helper for authenticated requests
const authHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const api = {
  // Auth
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  // User & Profile
  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: authHeaders() });
    return res.json();
  },

  getConnectedPlatforms: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/connected-platforms`, { headers: authHeaders() });
    return res.json();
  },

  connectPlatform: async (platform, handle, accessToken) => {
    const res = await fetch(`${API_BASE_URL}/auth/connect-platform`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ platform, handle, accessToken })
    });
    return res.json();
  },

  disconnectPlatform: async (platform) => {
    const res = await fetch(`${API_BASE_URL}/auth/disconnect-platform`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ platform })
    });
    return res.json();
  },

  // YouTube
  getYouTubeTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/youtube/trending`, { headers: authHeaders() });
    return res.json();
  },
  // Twitter
  getTwitterTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/twitter/trending`, { headers: authHeaders() });
    return res.json();
  },
  // Instagram (mock)
  getInstagramTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/instagram/trending`, { headers: authHeaders() });
    return res.json();
  },
  // LinkedIn (mock)
  getLinkedInTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/linkedin/trending`, { headers: authHeaders() });
    return res.json();
  },
  // TikTok (mock)
  getTikTokTrending: async () => {
    const res = await fetch(`${API_BASE_URL}/tiktok/trending`, { headers: authHeaders() });
    return res.json();
  },
  // Analytics
  getAnalyticsOverview: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/overview`, { headers: authHeaders() });
    return res.json();
  },
  // Content generation
  generateContent: async (topic, platform, goal) => {
    const res = await fetch(`${API_BASE_URL}/content/generate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ topic, platform, goal })
    });
    return res.json();
  },
  // Virality prediction
  predictVirality: async (contentData) => {
    const res = await fetch(`${API_BASE_URL}/content/predict`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(contentData)
    });
    return res.json();
  },
  // Strategy
  getBestPostingTimes: async () => {
    const res = await fetch(`${API_BASE_URL}/strategy/best-times`, { headers: authHeaders() });
    return res.json();
  },
  getFormatRecommendations: async () => {
    const res = await fetch(`${API_BASE_URL}/strategy/formats`, { headers: authHeaders() });
    return res.json();
  },
  generateStrategy: async (strategyData) => {
    const res = await fetch(`${API_BASE_URL}/strategy/generate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(strategyData)
    });
    return res.json();
  }
};

export default api;