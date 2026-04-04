const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log('✅ Prediction Service: Gemini AI initialized');
}

const predictionService = {
  calculateViralityScore: async (content) => {
    try {
      // 1. Try ML service first
      const response = await axios.post(`${ML_SERVICE_URL}/predict`, content, { timeout: 3000 });
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error('ML service returned error');
    } catch (error) {
      console.log('ML service unavailable, trying Gemini AI...');
      
      // 2. Try Gemini AI if available
      if (genAI) {
        try {
          return await predictionService.geminiPredict(content);
        } catch (geminiError) {
          console.error('Gemini prediction error:', geminiError.message);
        }
      }

      // 3. Fallback to rule-based scoring (final safety net)
      console.log('Using rule-based fallback');
      return predictionService.fallbackScore(content);
    }
  },

  geminiPredict: async (content) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze the viral potential of this content for ${content.platform}:
Title: ${content.title}
Description: ${content.description}
Hashtags: ${content.hashtags?.join(', ')}

Return ONLY valid JSON (no markdown) in this exact format:
{
  "viralityScore": Number (0-100),
  "predictedReach": Number (integer),
  "shareability": Number (0-100),
  "engagementFit": Number (0-100),
  "trendMatch": Number (0-100),
  "suggestions": [
     { "text": "Specific actionable tip", "impact": "High Impact/Medium/Low" }
  ]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const safeNum = (v, def = 0) => {
          if (typeof v === 'number') return v;
          if (typeof v === 'string') {
            const n = parseInt(v.replace(/[^0-9.-]/g, ''));
            return isNaN(n) ? def : n;
          }
          return def;
        };

        const reach = safeNum(parsed.predictedReach, 10000);
        return {
          viralityScore: safeNum(parsed.viralityScore, 50),
          predictedReach: reach,
          shareability: safeNum(parsed.shareability, 70),
          engagementFit: safeNum(parsed.engagementFit, 60),
          trendMatch: safeNum(parsed.trendMatch, 50),
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.map(s => ({
            text: typeof s === 'string' ? s : (s.text || 'Improve your content engagement'),
            impact: s.impact || 'Medium'
          })).slice(0, 4) : [],
          predictedEngagement: {
             likes: Math.floor(reach * 0.05),
             comments: Math.floor(reach * 0.01),
             shares: Math.floor(reach * 0.02)
          }
        };
      } catch (e) {
        console.error('Error parsing Gemini JSON:', e);
      }
    }
    throw new Error('Invalid JSON from Gemini Prediction');
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

    const predictedReach = Math.floor(10000 * (score / 50));
    const engRate = score / 100;

    // Generate dynamic suggestions
    const suggestions = [];
    if (!content.hasEmoji)        suggestions.push({ text: 'Add relevant emojis to boost engagement by up to 25%', impact: 'Medium' });
    if (!content.hasQuestion)     suggestions.push({ text: 'Include a question to encourage comments and interaction', impact: 'High Impact' });
    if (!content.hasCallToAction) suggestions.push({ text: 'Add a clear CTA like "Save this" or "Share with a friend"', impact: 'High Impact' });
    if (content.hashtags?.length < 3) suggestions.push({ text: 'Use 3–5 niche hashtags alongside 2 broad ones', impact: 'Medium' });
    if (content.title?.length < 30)   suggestions.push({ text: 'Expand your hook — aim for 40–60 characters for maximum impact', impact: 'High Impact' });
    if (suggestions.length === 0)     suggestions.push({ text: 'Great content! Post between 6–8PM on weekdays for peak engagement', impact: 'Medium' });

    return {
      viralityScore: score,
      predictedReach,
      predictedEngagement: {
        likes:    Math.floor(predictedReach * 0.06 * engRate),
        comments: Math.floor(predictedReach * 0.015 * engRate),
        shares:   Math.floor(predictedReach * 0.025 * engRate)
      },
      shareability:    Math.min(100, score + Math.floor(Math.random() * 10) - 5),
      engagementFit:   Math.min(100, score - 10 + Math.floor(Math.random() * 10)),
      trendMatch:      Math.min(100, score + 5 + Math.floor(Math.random() * 10) - 5),
      suggestions,
      confidence: score > 70 ? 'high' : score > 40 ? 'medium' : 'low'
    };
  }
};

module.exports = predictionService;