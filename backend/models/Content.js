const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, enum: ['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'TikTok'] },
  title: String,
  description: String,
  hashtags: [String],
  viralityScore: { type: Number, min: 0, max: 100 },
  predictedReach: Number,
  predictedEngagement: {
    likes: Number,
    comments: Number,
    shares: Number
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
