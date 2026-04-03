const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log('✅ Gemini AI initialized');
}

const geminiService = {
  generateContent: async (topic, platform, goal) => {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Generate 3 viral hooks, 2 captions, and 5 hashtags for ${platform} about "${topic}" with goal ${goal}. Return as JSON: { hooks: [], captions: [], hashtags: [] }`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch (error) {
        console.error('Gemini error:', error.message);
      }
    }
    // Fallback mock
    return {
      hooks: [
        `The one secret to viral ${topic} nobody tells you… 🤫`,
        `Stop scrolling! This ${topic} strategy will change everything.`,
        `I tried 50 ${topic} strategies. Only this one worked.`
      ],
      captions: [
        `🚀 ${topic} is the future! Here's why you need to care...\n\n#ViralPulse #${platform} #Growth`,
        `Your content deserves to be seen. Let's make it happen. ✨`
      ],
      hashtags: ['#ViralGrowth', '#ContentStrategy', '#AIMarketing', '#CreatorEconomy', `#${topic.replace(/ /g, '')}`]
    };
  }
};

module.exports = geminiService;
