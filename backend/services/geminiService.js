const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log('✅ Gemini AI initialized');
} else {
  console.log('⚠️  Gemini API key not set — will use fallback content');
}

const MODEL_CANDIDATES = [
  'gemini-1.5',
  'gemini-1.5-pro',
  'gemini-1.0',
  'gemini-1.0-pro',
  'gemini-pro',
  'gemini-pro-vision'
];

const extractJsonFromResponse = (text) => {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;

  const candidate = text.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    // fallback: balance braces and parse the first valid object
    let depth = 0;
    let objectStart = -1;
    for (let i = start; i <= end; i += 1) {
      if (text[i] === '{') {
        if (depth === 0) objectStart = i;
        depth += 1;
      }
      if (text[i] === '}') {
        depth -= 1;
        if (depth === 0 && objectStart !== -1) {
          try {
            return JSON.parse(text.slice(objectStart, i + 1));
          } catch {}
        }
      }
    }
  }
  return null;
};

const buildFallbackOutput = (topic, platform, goal) => {
  const cleanTag = (value) => `#${value.trim().replace(/[^a-zA-Z0-9]/g, '')}`;
  const normalizedTopic = topic.trim().replace(/\s+/g, ' ');
  return {
    hooks: [
      `A fresh ${platform} growth angle for ${normalizedTopic} that drives ${goal.toLowerCase()}.`, 
      `Why ${platform} creators should rethink ${normalizedTopic} today for better reach.`, 
      `How to turn ${normalizedTopic} into a high-performing ${goal.toLowerCase()} post on ${platform}.`
    ],
    captions: [
      `Ready to make ${normalizedTopic} perform on ${platform}? Use this AI-optimized idea to boost ${goal.toLowerCase()} and stand out.`,
      `This ${platform} strategy for ${normalizedTopic} combines clarity, emotion, and action — all built for ${goal.toLowerCase()}.`
    ],
    hashtags: [
      cleanTag(platform),
      cleanTag(topic),
      cleanTag(goal),
      '#ContentGrowth',
      '#AIContent'
    ]
  };
};

const geminiService = {
  generateContent: async (topic, platform, goal) => {
    if (genAI) {
      const prompt = `You are a high-end viral marketing expert.\nGenerate content for ${platform} about \"${topic}\" with the primary goal of \"${goal}\".\n\nReturn ONLY valid JSON (no markdown, no code blocks) in this exact format:\n{\n  \"hooks\": [\"hook 1\", \"hook 2\", \"hook 3\"],\n  \"captions\": [\"caption 1\", \"caption 2\"],\n  \"hashtags\": [\"#tag1\", \"#tag2\", \"#tag3\"]\n}\n\nUse three unique content hooks, two optimized captions, and five trending hashtags. Use the tone and format appropriate for ${platform}.`;

      for (const modelName of MODEL_CANDIDATES) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          console.log(`🤖 Requesting Gemini (${modelName}) for ${platform} content: ${topic}...`);
          const result = await model.generateContent([prompt]);
          const text = await result.response.text();
          const parsed = extractJsonFromResponse(text);
          if (parsed && parsed.hooks && parsed.captions && parsed.hashtags) {
            console.log(`✅ Gemini content generated successfully with ${modelName} for ${topic}`);
            return {
              hooks: Array.isArray(parsed.hooks) ? parsed.hooks : [],
              captions: Array.isArray(parsed.captions) ? parsed.captions : [],
              hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : []
            };
          }

          console.warn(`⚠️ Gemini response from ${modelName} could not be parsed as valid JSON. Raw response:`, text);
        } catch (error) {
          console.error(`❌ Gemini model ${modelName} error:`, error.message);
          continue;
        }
      }

      console.error('❌ Gemini content generation failed for all candidate models. Falling back to dynamic local content.');
    }

    return buildFallbackOutput(topic, platform, goal);
  },

  generateWeeklyStrategy: async (niche, goals, platformFocus = ['Instagram']) => {
    if (genAI) {
      const prompt = `You are a world-class Growth Strategist.\nAnalyze the niche \"${niche}\" with the primary goal of \"${goals}\".\nFocus on these platforms: ${platformFocus.join(', ')}.\n\nReturn ONLY valid JSON (no markdown) in this exact format:\n{\n  \"weeklyPlan\": [\n    { \"action\": \"Specific task string\", \"platform\": \"PlatformName\", \"priority\": \"High/Medium\" }\n  ],\n  \"distributionFlow\": [\n    { \"platform\": \"PlatformName\", \"action\": \"Specific cross-platform action\", \"timing\": \"Day X\" }\n  ],\n  \"formatRecommendations\": [\n    { \"platform\": \"PlatformName\", \"format\": \"e.g. Reels\", \"reason\": \"Why it works now\" }\n  ]\n}\n\nGenerate 5 distinct weekly actions and 3-4 distribution flow steps. \nRules: Be unconventional. Avoid generic advice. Focus on what's trending in 2026.`;

      for (const modelName of MODEL_CANDIDATES) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          console.log(`🤖 Requesting Gemini strategy (${modelName}) for ${niche}...`);
          const result = await model.generateContent([prompt]);
          const text = await result.response.text();
          const parsed = extractJsonFromResponse(text);
          if (parsed) {
            return {
              weeklyPlan: Array.isArray(parsed.weeklyPlan) ? parsed.weeklyPlan : [],
              distributionFlow: Array.isArray(parsed.distributionFlow) ? parsed.distributionFlow : [],
              formatRecommendations: Array.isArray(parsed.formatRecommendations) ? parsed.formatRecommendations : []
            };
          }
          console.warn(`⚠️ Strategy response from ${modelName} could not be parsed as valid JSON. Raw response:`, text);
        } catch (error) {
          console.error(`❌ Gemini strategy model ${modelName} error:`, error.message);
          continue;
        }
      }

      console.error('❌ Gemini strategy generation failed for all candidate models. Falling back to local plan.');
    }

    return {
      weeklyPlan: [
        { action: `Post a tutorial about ${niche} on ${platformFocus[0]}`, platform: platformFocus[0], priority: 'High' },
        { action: `Share a behind-the-scenes carousel on LinkedIn`, platform: 'LinkedIn', priority: 'Medium' },
        { action: `Repurpose top clip as a YouTube Short`, platform: 'YouTube', priority: 'Medium' },
        { action: `Host a live Q&A about ${goals}`, platform: platformFocus[0], priority: 'High' },
      ],
      distributionFlow: [
        { platform: platformFocus[0], action: `Initial post on ${platformFocus[0]}`, timing: 'Day 1' },
        { platform: 'YouTube', action: 'Cross-post as Short', timing: 'Day 2' },
        { platform: 'LinkedIn', action: 'Share insights as article', timing: 'Day 4' },
      ],
      formatRecommendations: [
        { platform: 'Instagram', format: 'Short Reels', reason: 'High algorithmic push' },
        { platform: 'YouTube', format: 'Live Stream', reason: 'Community building' }
      ]
    };
  }
};

module.exports = geminiService;
