const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: String,
  date: Date,
  reach: Number,
  impressions: Number,
  engagementRate: Number,
  followers: Number
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
