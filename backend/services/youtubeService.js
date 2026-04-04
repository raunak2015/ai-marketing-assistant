const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeService = {
  getTrendingVideos: async (regionCode = 'IN', maxResults = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode,
          maxResults,
          key: YOUTUBE_API_KEY
        }
      });
      return response.data.items.map(video => ({
        id: video.id,
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        views: parseInt(video.statistics.viewCount),
        likes: parseInt(video.statistics.likeCount),
        comments: parseInt(video.statistics.commentCount),
        thumbnail: video.snippet.thumbnails.high.url,
        publishedAt: video.snippet.publishedAt
      }));
    } catch (error) {
      console.error('YouTube API Error:', error.message);
      throw error;
    }
  }
};

module.exports = youtubeService;
