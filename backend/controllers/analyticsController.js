exports.getOverview = (req, res) => {
  res.json({
    success: true,
    data: {
      totalReach: '2.4M',
      engagementRate: '4.8%',
      totalViews: '18.2K hrs',
      totalShares: '84.1K',
      followerGrowth: '+12.4K',
      platformBreakdown: { instagram: 45, youtube: 28, linkedin: 15, twitter: 12 },
      recentTrends: [
        { topic: '#AIArt', growth: '+142%', volume: '2.4M' },
        { topic: '#CreatorEconomy', growth: '+98%', volume: '1.8M' },
        { topic: '#ViralHacks', growth: '+76%', volume: '1.2M' }
      ]
    }
  });
};
