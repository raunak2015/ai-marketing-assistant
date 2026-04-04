const DashboardData = require('../models/DashboardData');

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const generateDashboardData = (userId, userName) => {
  const seed = hashString(userId);
  const rand = (min, max, offset = 0) => {
    const value = seededRandom(seed + offset) * (max - min) + min;
    return Math.round(value * 10) / 10;
  };
  const randInt = (min, max, offset = 0) => Math.floor(rand(min, max, offset));
  const randChoice = (arr, offset = 0) => arr[Math.floor(seededRandom(seed + offset) * arr.length)];

  const firstName = userName.split(' ')[0] || userName;
  const fullName = userName;

  const platformNames = ['Instagram', 'Twitter', 'YouTube', 'LinkedIn'];
  const platformColors = ['#C05A38', '#506B40', '#A8442A', '#C9A96E'];
  const platformColorIdx = randInt(0, 3, 1);

  const viralityScore = randInt(45, 95, 2);
  const reachPotential = rand(0.8, 5.2, 3);
  const engagementRate = rand(3.5, 12.5, 4);
  const contentOptimized = randInt(15, 120, 5);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const engagementData = days.map((day, i) => ({
    day,
    instagram: randInt(2000, 12000, i * 10 + 1),
    youtube: randInt(1500, 8000, i * 10 + 2),
    linkedin: randInt(500, 3000, i * 10 + 3),
    twitter: randInt(1800, 9000, i * 10 + 4),
  }));

  const totalEngagement = engagementData.reduce((sum, d) =>
    sum + d.instagram + d.youtube + d.linkedin + d.twitter, 0);

  const bestDay = days[randInt(0, 6, 6)];
  const topPlatform = platformNames[platformColorIdx];

  const hookStrength = randInt(55, 98, 7);
  const shareability = randInt(50, 95, 8);
  const seoMatch = randInt(45, 90, 9);
  const emotionScore = randInt(60, 99, 10);

  const predictedViewsLow = randInt(20, 80, 11);
  const predictedViewsHigh = randInt(predictedViewsLow + 20, predictedViewsLow + 80, 12);
  const estLikesLow = randInt(1, 5, 13);
  const estLikesHigh = randInt(estLikesLow + 2, estLikesLow + 8, 14);
  const estSharesLow = randInt(100, 800, 15);
  const estSharesHigh = randInt(estSharesLow + 200, estSharesLow + 1000, 16);
  const commentsLow = randInt(50, 300, 17);
  const commentsHigh = randInt(commentsLow + 100, commentsLow + 500, 18);

  const performerNames = [
    ['Alex Rivera', 'Jordan Smith', 'Sarah Chen', 'Mike Johnson', 'Emma Davis'],
    ['Priya Sharma', 'David Kim', 'Lisa Wang', 'Tom Wilson', 'Nina Patel'],
    ['Carlos Rodriguez', 'Amy Zhang', 'Kevin Brown', 'Rachel Green', 'Sam Lee'],
    ['Maria Garcia', 'James Chen', 'Sofia Martinez', 'Ryan Taylor', 'Aisha Johnson'],
    ['Omar Hassan', 'Emily Watson', 'Raj Patel', 'Sophie Martin', 'Marcus Johnson'],
  ];
  const performerNameSet = performerNames[randInt(0, 4, 19)];

  const performers = performerNameSet.slice(0, 3).map((name, i) => ({
    name,
    score: `${rand(4.5, 12.5, 20 + i).toFixed(1)}k`,
    pct: randInt(55, 98, 23 + i),
  }));

  const aiRecs = [
    { emoji: '🌱', body: 'Post carousels with ', hl: 'growth', tail: ' tagging.' },
    { emoji: '🌿', body: 'Update bio to include ', hl: 'CTA links', tail: '.' },
    { emoji: '🪴', body: 'Collaborate with ', hl: 'Top 3', tail: ' partners.' },
    { emoji: '🍃', body: 'A/B test ', hl: 'headlines', tail: ' color themes.' },
    { emoji: '📈', body: 'Leverage ', hl: 'trending hashtags', tail: ' this week.' },
    { emoji: '🎯', body: 'Focus on ', hl: 'short-form video', tail: ' content.' },
    { emoji: '💡', body: 'Try ', hl: 'behind-the-scenes', tail: ' content for authenticity.' },
    { emoji: '🚀', body: 'Schedule posts during ', hl: 'peak hours', tail: ' for reach.' },
  ];
  const selectedRecs = [0, 1, 2, 3].map(i => aiRecs[randInt(0, aiRecs.length, 30 + i)]);

  const statuses = ['Optimal Growth', 'Steady Progress', 'Accelerating', 'Building Momentum'];
  const status = statuses[randInt(0, 3, 31)];

  const viralityLabel = viralityScore >= 80 ? 'Very High' :
    viralityScore >= 65 ? 'High' :
      viralityScore >= 50 ? 'Moderate' : 'Building';

  const hookTips = [
    'Add a surprising statistic in the first 3 seconds',
    'Start with a question to engage viewers',
    'Use a bold statement right at the beginning',
    'Show the end result first, then explain',
    'Add text overlays for key points',
  ];
  const hookTip = hookTips[randInt(0, hookTips.length, 32)];

  return {
    greeting: firstName,
    fullName,
    status,
    topStats: [
      {
        title: 'Virality Score',
        sub: 'vs last week',
        val: String(viralityScore),
        unit: '/100',
        trend: `${viralityRate(engagementRate)}%`,
        up: viralityRate(engagementRate) >= 0,
        Icon: 'Zap',
        color: '#C05A38',
        bgGlow: 'rgba(192,90,56,0.14)',
        iconBg: '#F3E5DF',
      },
      {
        title: 'Reach Potential',
        sub: 'this month',
        val: `${reachPotential.toFixed(1)}M`,
        unit: '',
        trend: `${reachTrend(reachPotential)}%`,
        up: reachPotential > 2.5,
        Icon: 'Users',
        color: '#7A9A6E',
        bgGlow: 'rgba(122,154,110,0.12)',
        iconBg: '#E9EFEB',
      },
      {
        title: 'Avg Engagement Rate',
        sub: 'vs avg',
        val: engagementRate.toFixed(1),
        unit: '%',
        trend: `${engagementTrend(engagementRate)}%`,
        up: engagementRate > 6,
        Icon: 'Percent',
        color: '#C9A96E',
        bgGlow: 'rgba(201,169,110,0.12)',
        iconBg: '#F7EFE4',
      },
      {
        title: 'Content Optimized',
        sub: 'this month',
        val: String(contentOptimized),
        unit: ' pieces',
        trend: `${contentTrend(contentOptimized)}%`,
        up: contentOptimized > 50,
        Icon: 'FileText',
        color: '#506B40',
        bgGlow: 'rgba(80,107,64,0.12)',
        iconBg: '#E4EBDF',
      },
    ],
    engagementData,
    totalEngagement: (totalEngagement / 1000).toFixed(1),
    platformMetrics: platformNames.map((name, i) => ({
      name,
      value: `${rand(8, 60, 40 + i).toFixed(1)}K`,
      trend: `${rand(-5, 20, 45 + i).toFixed(0)}%`,
      up: seededRandom(seed + 45 + i) > 0.3,
      color: platformColors[i],
    })),
    viralityPrediction: {
      score: viralityScore,
      label: viralityLabel,
      predictedViews: `${predictedViewsLow}.0K-${predictedViewsHigh}.0K`,
      estLikes: `${estLikesLow}.${randInt(0, 9, 50)}K-${estLikesHigh}.${randInt(0, 9, 51)}K`,
      estShares: `${estSharesLow}-${(estSharesHigh / 1000).toFixed(1)}K`,
      comments: `${commentsLow}-${commentsHigh}`,
      metrics: [
        { label: 'Hook Strength', val: hookStrength },
        { label: 'Shareability', val: shareability },
        { label: 'SEO Match', val: seoMatch },
        { label: 'Emotion Score', val: emotionScore },
      ],
    },
    insights: {
      bestDay,
      topPlatform,
      avgDaily: `${((totalEngagement / 7) / 1000).toFixed(1)}K`,
    },
    performers,
    aiRecs: selectedRecs,
    hookTip,
  };
};

const viralityRate = (base) => {
  const rate = (base - 5) * 1.5;
  return rate >= 0 ? `+${Math.round(rate)}` : `${Math.round(rate)}`;
};

const reachTrend = (value) => {
  if (value > 3.5) return '+28';
  if (value > 2.5) return '+18';
  if (value > 1.5) return '+12';
  return '+8';
};

const engagementTrend = (value) => {
  if (value > 8) return '+5';
  if (value > 6) return '+2';
  if (value > 4) return '-1';
  return '-3';
};

const contentTrend = (value) => {
  if (value > 80) return '+15';
  if (value > 50) return '+10';
  if (value > 30) return '+5';
  return '+3';
};

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let dashboardData = await DashboardData.findOne({ userId });

    if (!dashboardData) {
      const generatedData = generateDashboardData(userId.toString(), user.name);
      dashboardData = await DashboardData.create({
        userId,
        ...generatedData,
        updatedAt: new Date()
      });
    }

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.refreshDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const generatedData = generateDashboardData(userId.toString(), user.name);
    
    const dashboardData = await DashboardData.findOneAndUpdate(
      { userId },
      { ...generatedData, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    console.error('Refresh dashboard data error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
