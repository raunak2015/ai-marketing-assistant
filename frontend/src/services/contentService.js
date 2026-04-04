// Content service - wraps api.js calls for content operations
import api from './api';

export const contentService = {
  generate: (topic, platform, goal) => api.generateContent(topic, platform, goal),
  predict: (contentData) => api.predictVirality(contentData),
};

export default contentService;
