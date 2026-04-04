const mongoose = require('mongoose');

const dashboardDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  greeting: { type: String },
  status: { type: String },
  fullName: { type: String },
  topStats: [{
    title: String,
    sub: String,
    val: String,
    unit: String,
    trend: String,
    up: Boolean,
    Icon: String,
    color: String,
    bgGlow: String,
    iconBg: String
  }],
  engagementData: [{
    day: String,
    instagram: Number,
    youtube: Number,
    linkedin: Number,
    twitter: Number
  }],
  totalEngagement: String,
  platformMetrics: [{
    name: String,
    value: String,
    trend: String,
    up: Boolean,
    color: String
  }],
  viralityPrediction: {
    score: Number,
    label: String,
    predictedViews: String,
    estLikes: String,
    estShares: String,
    comments: String,
    metrics: [{
      label: String,
      val: Number
    }]
  },
  insights: {
    bestDay: String,
    topPlatform: String,
    avgDaily: String
  },
  performers: [{
    name: String,
    score: String,
    pct: Number
  }],
  aiRecs: [{
    emoji: String,
    body: String,
    hl: String,
    tail: String
  }],
  hookTip: String,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('DashboardData', dashboardDataSchema);
