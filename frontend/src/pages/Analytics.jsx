import { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Globe, Camera, Video, Users, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SVGIcon = ({ children, size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const UpIcon = (p) => <SVGIcon {...p}><polyline points="7 17 17 7"/><polyline points="7 7 17 7 17 17"/></SVGIcon>;
const DownIcon = (p) => <SVGIcon {...p}><polyline points="7 7 17 17"/><polyline points="17 7 17 17 7 17"/></SVGIcon>;
const GrowIcon = (p) => <SVGIcon {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SVGIcon>;

const TwitterIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const DATE_RANGES = ['7D', '30D', '90D'];
const PLAT_TABS = [
  { label: 'All Platforms', key: 'all', Icon: Globe },
  { label: 'Instagram', key: 'instagram', Icon: Camera },
  { label: 'YouTube', key: 'youtube', Icon: Video },
  { label: 'LinkedIn', key: 'linkedin', Icon: Users },
  { label: 'Twitter', key: 'twitter', Icon: TwitterIcon },
];

const defaultKpis = [
  { label: 'Total Reach', value: '0', delta: '+0%', up: true },
  { label: 'Engagement Rate', value: '0%', delta: '+0%', up: true },
  { label: 'Watch Time', value: '0 hrs', delta: '+0%', up: true },
  { label: 'Shares', value: '0', delta: '+0%', up: false },
  { label: 'Follower Growth', value: '+0', delta: '+0%', up: true },
];

const platColor = {
  Instagram: { bg: '#FEE8DC', text: '#C05A38' },
  LinkedIn: { bg: '#FEF8E2', text: '#A87B00' },
  YouTube: { bg: '#FEF0EA', text: '#A8442A' },
  Twitter: { bg: '#FEF8E2', text: '#8A7A5A' }
};

const vColor = (v) => v >= 85 ? '#7A9A6E' : v >= 75 ? '#C9A96E' : '#C05A38';

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FFFFFF', borderRadius: 20, border: '1px solid #EAE4DC',
    boxShadow: '0 4px 12px rgba(43,34,24,0.03)', padding: '24px',
    boxSizing: 'border-box', height: '100%', ...style,
  }}>{children}</div>
);

const LoadingSpinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
    <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', color: '#C05A38' }} />
  </div>
);

export default function Analytics() {
  const [range, setRange] = useState('30D');
  const [platTab, setPlatTab] = useState('all');
  const [kpis, setKpis] = useState(defaultKpis);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('viralPulseToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setAnalyticsData(result.data);
          updateKpis(result.data, 'all', range);
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultPlatformData = {
    instagram: { reach: '2.5M', engagement: '6.5%', followers: '25K', posts: 50, shares: '8K' },
    youtube: { reach: '1.2M', engagement: '5.0%', watchTime: '25K hrs', subscribers: '15K', posts: 40, shares: '10K' },
    linkedin: { reach: '0.8M', engagement: '4.0%', connections: '2500', posts: 20, shares: '3K' },
    twitter: { reach: '1.5M', engagement: '3.5%', followers: '12K', posts: 200, shares: '12K' },
  };

  const defaultKpisData = {
    totalReach: '6.0M',
    engagementRate: '4.8%',
    watchTime: '25K hrs',
    shares: '33K',
    followerGrowth: '+15K',
  };

  const updateKpis = (data, platform = 'all', dateRange = '90D') => {
    const parseValue = (val, convertToNumber = true) => {
      if (val === null || val === undefined || val === '') return 0;
      if (typeof val === 'number') return val;
      const strVal = String(val).toUpperCase();
      const cleanVal = strVal.replace(/[^0-9.]/g, '');
      const num = parseFloat(cleanVal);
      if (isNaN(num)) return 0;
      if (strVal.includes('M')) return num * 1000;
      if (strVal.includes('K')) return num;
      return num;
    };
    
    const formatReach = (val) => {
      if (val >= 1000) return `${(val / 1000).toFixed(1)}M`;
      if (val > 0) return `${Math.round(val)}K`;
      return '0K';
    };
    
    const formatNum = (val) => {
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      if (val > 0) return `${Math.round(val)}`;
      return '0';
    };
    
    const multiplier = dateRange === '7D' ? 1/6 : dateRange === '30D' ? 4/6 : 1;
    
    if (platform === 'all') {
      const kpis = data?.kpis || defaultKpisData;
      const totalReach = parseValue(kpis.totalReach);
      const watchTime = parseValue(kpis.watchTime) * multiplier;
      const shares = parseValue(kpis.shares) * multiplier;
      const followerGrowth = parseValue(kpis.followerGrowth) * multiplier;
      
      setKpis([
        { label: 'Total Reach', value: formatReach(totalReach * multiplier), delta: '+12%', up: true },
        { label: 'Engagement Rate', value: kpis.engagementRate || '4.8%', delta: '+0.6%', up: true },
        { label: 'Watch Time', value: `${formatNum(watchTime)}K hrs`, delta: '+22%', up: true },
        { label: 'Shares', value: `${formatNum(shares)}K`, delta: '-3%', up: false },
        { label: 'Follower Growth', value: `+${formatNum(followerGrowth)}K`, delta: '+9%', up: true },
      ]);
    } else {
      const platformKey = platform.toLowerCase();
      
      let stats = null;
      
      if (data?.platformStats?.[platformKey]) {
        stats = data.platformStats[platformKey];
      } else if (data?.[platformKey]) {
        stats = data[platformKey];
      }
      
      if (!stats) {
        stats = defaultPlatformData[platformKey] || {
          reach: '0K',
          engagement: '0%',
          followers: '0K',
          shares: '0K',
          posts: 0,
        };
      }
      
      const reach = parseValue(stats.reach) * multiplier;
      const engagement = parseValue(stats.engagement);
      const shares = parseValue(stats.shares) * multiplier;
      const followers = parseValue(stats.followers || stats.subscribers || stats.connections) * multiplier;
      const posts = parseValue(stats.posts);
      const watchTime = parseValue(stats.watchTime);
      
      const platformKpis = [
        { label: 'Total Reach', value: formatReach(reach), delta: '+12%', up: true },
        { label: 'Engagement Rate', value: `${engagement.toFixed(1)}%`, delta: '+0.6%', up: true },
      ];
      
      if (watchTime > 0) {
        platformKpis.push({ label: 'Watch Time', value: `${formatNum(watchTime)}K hrs`, delta: '+22%', up: true });
      }
      
      platformKpis.push({ label: 'Shares', value: `${formatNum(shares)}K`, delta: '-3%', up: true });
      
      if (stats.subscribers) {
        platformKpis.push({ label: 'Subscribers', value: `${formatNum(followers)}K`, delta: '+9%', up: true });
      } else if (stats.connections) {
        platformKpis.push({ label: 'Connections', value: `${formatNum(followers)}`, delta: '+9%', up: true });
      } else if (stats.followers) {
        platformKpis.push({ label: 'Followers', value: `${formatNum(followers)}K`, delta: '+9%', up: true });
      }
      
      if (posts > 0) {
        const adjustedPosts = Math.round(posts * multiplier);
        platformKpis.push({ label: 'Total Posts', value: String(adjustedPosts), delta: '+5%', up: true });
      }
      
      setKpis(platformKpis);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (analyticsData) {
      updateKpis(analyticsData, platTab, range);
    }
  }, [platTab, analyticsData, range]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('viralPulseToken');
      const response = await fetch(`${API_URL}/analytics/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setAnalyticsData(result.data);
          updateKpis(result.data, platTab, range);
        }
      }
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getFilteredImpressions = () => {
    if (!analyticsData?.impressions) return [];
    
    let impressions = analyticsData.impressions;
    
    if (range === '7D') {
      const lastWeek = impressions[impressions.length - 1];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      return days.map((day, i) => {
        const variance = 0.7 + (i * 0.05);
        const randomFactor = 0.9 + Math.random() * 0.2;
        
        if (platTab === 'all') {
          return {
            week: day,
            instagram: Math.round(lastWeek.instagram * variance * randomFactor),
            youtube: Math.round(lastWeek.youtube * variance * randomFactor),
            linkedin: Math.round(lastWeek.linkedin * variance * randomFactor),
            twitter: Math.round(lastWeek.twitter * variance * randomFactor),
          };
        }
        
        return {
          week: day,
          value: Math.round((lastWeek[platTab] || 0) * variance * randomFactor),
        };
      });
    } else if (range === '30D') {
      impressions = impressions.slice(-4);
    }
    
    if (platTab === 'all') {
      return impressions.map(week => ({
        week: week.week,
        instagram: week.instagram,
        youtube: week.youtube,
        linkedin: week.linkedin,
        twitter: week.twitter,
      }));
    }
    
    return impressions.map(week => ({
      week: week.week,
      value: week[platTab] || 0,
    }));
  };

  const getFilteredContent = () => {
    if (!analyticsData?.topContent) return [];
    
    if (platTab === 'all') {
      return analyticsData.topContent;
    }
    
    return analyticsData.topContent.filter(
      content => content.platform.toLowerCase() === platTab
    );
  };

  const getPlatformBreakdown = () => {
    if (!analyticsData?.platformBreakdown) {
      return [
        { name: 'Instagram', value: 45, color: '#C05A38' },
        { name: 'YouTube', value: 28, color: '#506B40' },
        { name: 'LinkedIn', value: 15, color: '#C9A96E' },
        { name: 'Twitter', value: 12, color: '#3A3028' },
      ];
    }
    return analyticsData.platformBreakdown;
  };

  const getAudienceMetrics = () => {
    return analyticsData?.audienceMetrics || [
      { label: 'Gen Z Alignment', score: 92, trend: '+5%' },
      { label: 'Tech Enthusiasts', score: 85, trend: '+12%' },
      { label: 'Creative Pros', score: 74, trend: '+2%' },
      { label: 'Global Reach', score: 68, trend: '-1%' },
    ];
  };

  const getAlgorithmMetrics = () => {
    return analyticsData?.algorithmMetrics || [
      { label: 'Watch Time Retention', score: 78 },
      { label: 'Save Rate', score: 62 },
      { label: 'Comment Rate', score: 84 },
      { label: 'Share Rate', score: 71 },
      { label: 'CTR', score: 55 },
    ];
  };

  const getFollowerGrowth = () => {
    return analyticsData?.followerGrowthData || [
      { month: 'Jan', followers: 12000 },
      { month: 'Feb', followers: 16000 },
      { month: 'Mar', followers: 20000 },
      { month: 'Apr', followers: 24000 },
      { month: 'May', followers: 30000 },
      { month: 'Jun', followers: 39000 },
    ];
  };

  const getTotalAudienceScore = () => {
    const metrics = getAudienceMetrics();
    return Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length);
  };

  const pill = (active) => ({
    padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
    background: active ? '#C05A38' : 'rgba(192,90,56,0.05)', color: active ? '#fff' : '#C05A38',
    border: 'none', fontSize: 13, fontWeight: active ? 700 : 500, transition: 'all 200ms',
  });

  if (loading) {
    return (
      <div className="an-root" style={{ width: '100%', padding: '36px', backgroundColor: '#EDE8DF', minHeight: '100vh' }}>
        <LoadingSpinner />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const filteredContent = getFilteredContent();
  const platformBreakdown = getPlatformBreakdown();

  return (
    <div className="an-root" style={{ width: '100%', padding: '36px', backgroundColor: '#EDE8DF', minHeight: '100vh', boxSizing: 'border-box' }}>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .an-kpi { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .an-charts-main { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 24px; }
        .an-strategy-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        @media (max-width: 1360px) {
          .an-strategy-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 1024px) {
          .an-charts-main { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', letterSpacing: '-1.2px', lineHeight: 1.1 }}>Analytics</h1>
          <p style={{ fontSize: 15, color: '#7A7068', margin: 0 }}>Comprehensive performance intelligence across your creator ecosystem.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
              background: '#FFF', color: '#C05A38', border: '1px solid #EAE4DC',
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              opacity: refreshing ? 0.7 : 1,
            }}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
          <div style={{ display: 'flex', gap: 10, background: '#FFF', padding: '6px', borderRadius: 999, border: '1px solid #EAE4DC' }}>
            {DATE_RANGES.map(d => <button key={d} style={pill(range === d)} onClick={() => setRange(d)}>{d}</button>)}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        {PLAT_TABS.map(p => (
          <button
            key={p.key}
            style={{
              ...pill(platTab === p.key),
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setPlatTab(p.key)}
          >
            <p.Icon size={16} />
            {p.label === 'All Platforms' ? 'Global' : p.label}
          </button>
        ))}
      </div>

      <div className="an-kpi">
        {kpis.map((k, i) => (
          <Card key={k.label} style={{ padding: '24px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.12em', margin: '0 0 12px' }}>{k.label.toUpperCase()}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#2B2218', letterSpacing: '-1px', lineHeight: 1 }}>{k.value}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: k.up ? '#E6F0E6' : '#FEE8DC' }}>
                {k.up ? <UpIcon size={12} color="#7A9A6E" /> : <DownIcon size={12} color="#C05A38" />}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: k.up ? '#7A9A6E' : '#C05A38' }}>{k.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="an-charts-main">
        <Card style={{ padding: '32px' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Impressions Over Time</h3>
            <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Engagement velocity benchmarks per channel</p>
          </div>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getFilteredImpressions()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE6DE" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12, fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #EAE4DC', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />
                {platTab === 'all' ? (
                  <>
                    <Line type="monotone" dataKey="instagram" stroke="#C05A38" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }} />
                    <Line type="monotone" dataKey="youtube" stroke="#506B40" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }} />
                    <Line type="monotone" dataKey="linkedin" stroke="#C9A96E" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }} />
                    <Line type="monotone" dataKey="twitter" stroke="#3A3028" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }} />
                  </>
                ) : (
                  <Line type="monotone" dataKey="value" stroke="#C05A38" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {platTab === 'all' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 3, background: '#C05A38', borderRadius: 2 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7068' }}>Instagram</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 3, background: '#506B40', borderRadius: 2 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7068' }}>YouTube</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 3, background: '#C9A96E', borderRadius: 2 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7068' }}>LinkedIn</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 3, background: '#3A3028', borderRadius: 2 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7068' }}>Twitter</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 3, background: '#C05A38', borderRadius: 2 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7068' }}>{platTab.charAt(0).toUpperCase() + platTab.slice(1)}</span>
              </div>
            )}
          </div>
        </Card>

        <Card style={{ padding: '32px' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Follower Growth</h3>
            <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Net audience expansion index (Last 6 Months)</p>
          </div>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getFollowerGrowth()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE6DE" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12, fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />
                <Area type="monotone" dataKey="followers" stroke="#C9A96E" strokeWidth={5} fillOpacity={1} fill="url(#colorF)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="an-strategy-row">
        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Platform Breakdown</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Market share by impressions</p>
          <div style={{ height: 180, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformBreakdown} innerRadius={60} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                  {platformBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: '#B0A89C' }}>TOTAL</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#2B2218' }}>100%</p>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {platformBreakdown.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }}></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A4036' }}>{d.name}</span>
                <span style={{ fontSize: 13, color: '#B0A89C', marginLeft: 'auto' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Audience Match Score</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Demographic resonance index</p>
          
          <div style={{ height: 180, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={getAudienceMetrics()} 
                  innerRadius={60} 
                  outerRadius={85} 
                  paddingAngle={8} 
                  dataKey="score" 
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {getAudienceMetrics().map((e, i) => (
                    <Cell key={i} fill={['#C05A38', '#7A9A6E', '#C9A96E', '#506B40'][i % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#2B2218', lineHeight: 1 }}>{getTotalAudienceScore()}%</p>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: '#B0A89C', marginTop: 4 }}>MATCH</p>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {getAudienceMetrics().map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: ['#C05A38', '#7A9A6E', '#C9A96E', '#506B40'][i % 4] }}></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A4036' }}>{m.label}</span>
                <span style={{ fontSize: 13, color: '#B0A89C', marginLeft: 'auto' }}>{m.score}%</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(122,154,110,0.05)', borderRadius: 12, border: '1px solid #E6F0E6' }}>
            <p style={{ margin: 0, fontSize: 12, color: '#506B40', lineHeight: 1.5, fontWeight: 600 }}>Highest resonance with Gen-Z Tech enthusiasts.</p>
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Algorithm Score</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Real-time platform health scores</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {getAlgorithmMetrics().map((m, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4A4036' }}>{m.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: vColor(m.score) }}>{m.score}%</span>
                </div>
                <div style={{ height: 6, background: '#ECE6DE', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${m.score}%`, height: '100%', background: vColor(m.score), borderRadius: 99 }}></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, padding: '16px', background: 'rgba(192,90,56,0.05)', borderRadius: 16, border: '1px solid #FEE8DC' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <GrowIcon size={18} color="#C05A38" />
              <span style={{ fontSize: 14, fontWeight: 900, color: '#C05A38' }}>AI FORECAST</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#7A7068', lineHeight: 1.6 }}>Hook strength is trending up. Post an Instagram Story to boost reach.</p>
          </div>
        </Card>
      </div>

      <Card style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h4 style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', margin: 0 }}>Top Performing Content</h4>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#B0A89C' }}>Last 30d</span>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #ECE6DE', paddingBottom: '14px', marginBottom: '8px' }}>
          <span style={{ flex: 4, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em' }}>CONTENT</span>
          <span style={{ flex: 1.5, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em', textAlign: 'center' }}>PLATFORM</span>
          <span style={{ flex: 1.2, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em', textAlign: 'center' }}>VIEWS</span>
          <span style={{ flex: 2, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em', textAlign: 'center' }}>ENGAGEMENT</span>
          <span style={{ flex: 1.5, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em', textAlign: 'center' }}>VIRALITY</span>
          <span style={{ flex: 1.5, fontSize: 11, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.05em', textAlign: 'right' }}>POSTED</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredContent.length > 0 ? filteredContent.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', padding: '20px 0', borderBottom: idx === filteredContent.length - 1 ? 'none' : '1px solid #F4F0EB', alignItems: 'center' }}>
              <div style={{ flex: 4 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2B2218' }}>{item.title}</p>
              </div>
              
              <div style={{ flex: 1.5, textAlign: 'center' }}>
                <span style={{ 
                  fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 99, 
                  background: platColor[item.platform]?.bg || '#F5F5F5', 
                  color: platColor[item.platform]?.text || '#666' 
                }}>
                  {item.platform}
                </span>
              </div>

              <div style={{ flex: 1.2, textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#2B2218' }}>{item.views}</span>
              </div>

              <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <div style={{ width: 60, height: 6, background: '#F0EBE5', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${parseFloat(item.engagement) * 8}%`, height: '100%', background: '#7A9A6E' }}></div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7A7068' }}>{item.engagement}%</span>
              </div>

              <div style={{ flex: 1.5, textAlign: 'center' }}>
                <span style={{ 
                  fontSize: 13, fontWeight: 800, padding: '6px 14px', borderRadius: 99,
                  background: vColor(item.virality) + '15',
                  color: vColor(item.virality),
                }}>
                  {item.virality}/100</span>
              </div>

              <div style={{ flex: 1.5, textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: '#B0A89C', fontWeight: 500 }}>{item.posted}</span>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7A7068' }}>
              No content found for this platform
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
