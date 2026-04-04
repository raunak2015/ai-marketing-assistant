import { useState, useEffect } from 'react';
import { Search, RefreshCw, TrendingUp, Filter, Globe } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import api from '../services/api';

/* ─── SVG Platform Icons ─── */
const IgIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YtIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const LiIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── Trend Sparklines ─── */
const spark = (shape) => {
  const sets = {
    up:    [{ v:1},{v:2},{v:1.5},{v:3},{v:2.8},{v:4},{v:5}],
    down:  [{ v:5},{v:4},{v:4.2},{v:3},{v:2.5},{v:2},{v:1}],
    spike: [{ v:1},{v:1.5},{v:2},{v:4},{v:3},{v:5},{v:6}],
  };
  return sets[shape] || sets['up'];
};

const Sparkline = ({ shape = 'up', color = '#C05A38' }) => (
  <ResponsiveContainer width={80} height={36}>
    <LineChart data={spark(shape)}>
      <Line dataKey="v" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

/* ─── Static categories and platform list ─── */
const CATEGORIES = ['All', 'Entertainment', 'Tech', 'Business', 'Lifestyle'];
const PLATFORMS = [
  { id: 'all', label: 'All', Icon: null },
  { id: 'instagram', label: 'Instagram', Icon: IgIcon },
  { id: 'youtube', label: 'YouTube', Icon: YtIcon },
  { id: 'linkedin', label: 'LinkedIn', Icon: LiIcon },
  { id: 'twitter', label: 'Twitter', Icon: TwIcon },
];

// Original mock trends (kept as fallback for non‑YouTube platforms)
const MOCK_TRENDS = [
  {
    id: 1, icon: <IgIcon size={18}/>, platform:'instagram', category:'Tech',
    title:'#AIContentCreation', spike:'+284%', status:'hot', statusLabel:'hot',
    tags:['Tech'], volume:'2.4M', hashtags:['#AI','#ContentMarketing','#DigitalMarketing'],
    shape:'spike', color:'#C05A38'
  },
  {
    id: 2, icon: <YtIcon size={18}/>, platform:'youtube', category:'Entertainment',
    title:'Short-form Video Strategy', spike:'+156%', status:'rising', statusLabel:'rising',
    tags:['Entertainment'], volume:'890.0K', hashtags:['#YouTubeShorts','#VideoMarketing','#Reels'],
    shape:'up', color:'#C9A96E'
  },
  {
    id: 4, icon: <LiIcon size={18}/>, platform:'linkedin', category:'Business',
    title:'B2B Thought Leadership', spike:'+78%', status:'new', statusLabel:'new',
    tags:['Business'], volume:'340.0K', hashtags:['#Leadership','#B2B','#ProfessionalDevelopment'],
    shape:'up', color:'#506B40'
  },
  {
    id: 5, icon: <TwIcon size={18}/>, platform:'twitter', category:'Tech',
    title:'#VibeCoding', spike:'+220%', status:'rising', statusLabel:'rising',
    tags:['Tech'], volume:'1.2M', hashtags:['#Coding','#Dev','#AITools'],
    shape:'spike', color:'#2B2218'
  },
  {
    id: 6, icon: <IgIcon size={18}/>, platform:'instagram', category:'Lifestyle',
    title:'Aesthetic Workspace Setup', spike:'+195%', status:'hot', statusLabel:'hot',
    tags:['Lifestyle'], volume:'3.1M', hashtags:['#WorkspaceGoals','#DeskSetup','#HomeOffice'],
    shape:'up', color:'#C05A38'
  },
  {
    id: 7, icon: <YtIcon size={18}/>, platform:'youtube', category:'Tech',
    title:'AI Tools Comparison 2025', spike:'+330%', status:'hot', statusLabel:'hot',
    tags:['Tech'], volume:'1.8M', hashtags:['#AITools','#ProductivityHacks','#Tech2025'],
    shape:'spike', color:'#C9A96E'
  },
];

const STATUS_STYLE = {
  hot:    { bg:'#FEE8DC', color:'#C05A38' },
  rising: { bg:'#E6F0E6', color:'#506B40' },
  new:    { bg:'#FEF8E2', color:'#A87B00' },
};

/* ─── Trend Card (unchanged) ─── */
const TrendCard = ({ trend }) => {
  const st = STATUS_STYLE[trend.status] || STATUS_STYLE.hot;
  return (
    <div style={{
      background:'#FFFFFF', border:'1px solid #EAE4DC', borderRadius:16,
      padding:'20px', display:'flex', flexDirection:'column', gap:12,
      boxShadow:'0 2px 10px rgba(43,34,24,0.04)', transition:'transform 150ms, box-shadow 150ms'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(43,34,24,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 10px rgba(43,34,24,0.04)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ color: trend.color }}>{trend.icon}</span>
          <span style={{ fontSize:14, fontWeight:700, color:'#2B2218' }}>{trend.title}</span>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:13, fontWeight:800, color:'#2E6B30' }}>{trend.spike}</div>
          <div style={{ fontSize:10, color:'#B0A89C', fontWeight:600 }}>spike</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:st.bg, color:st.color }}>
          {trend.statusLabel === 'hot' ? '🔥' : trend.statusLabel === 'rising' ? '⬆️' : '✨'} {trend.statusLabel}
        </span>
        {trend.tags.map(t => (
          <span key={t} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:999, background:'#EAE4DC', color:'#7A7068' }}>{t}</span>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <div style={{ fontSize:10, color:'#B0A89C', fontWeight:600, marginBottom:2 }}>Volume</div>
          <div style={{ fontSize:17, fontWeight:800, color:'#2B2218' }}>{trend.volume}</div>
        </div>
        <Sparkline shape={trend.shape} color={trend.color} />
      </div>

      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {trend.hashtags.map(h => (
          <span key={h} style={{ fontSize:11, color:'#7A7068', fontWeight:500 }}>{h}</span>
        ))}
      </div>

      <button style={{
        width:'100%', padding:'10px', borderRadius:10, border:'1.5px solid #EAE4DC',
        background:'#FAFAF8', color:'#2B2218', fontSize:13, fontWeight:700,
        cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        transition:'all 150ms'
      }}
        onMouseEnter={e => { e.currentTarget.style.background='#F0EBE3'; e.currentTarget.style.borderColor='#D29D8D'; }}
        onMouseLeave={e => { e.currentTarget.style.background='#FAFAF8'; e.currentTarget.style.borderColor='#EAE4DC'; }}
      >
        ✦ Create Content
      </button>
    </div>
  );
};

/* ─── MAIN PAGE ─── */
export default function TrendDetection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [platform, setPlatform] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [trends, setTrends] = useState(MOCK_TRENDS);
  const [loading, setLoading] = useState(false);

  const fetchRealTrends = async () => {
    if (platform === 'youtube' || platform === 'all') {
      setLoading(true);
      try {
        const res = await api.getYouTubeTrending();
        if (res.success && res.data) {
          const youtubeTrends = res.data.slice(0, 6).map((video, idx) => ({
            id: video.id,
            icon: <YtIcon size={18} />,
            platform: 'youtube',
            category: 'Entertainment',
            title: video.title.length > 40 ? video.title.slice(0, 40) + '…' : video.title,
            spike: `+${Math.floor(Math.random() * 200) + 50}%`,
            status: idx < 2 ? 'hot' : 'rising',
            statusLabel: idx < 2 ? 'hot' : 'rising',
            tags: ['Trending'],
            volume: (video.views / 1000).toFixed(0) + 'K',
            hashtags: [`#${video.title.split(' ')[0]}`, '#Viral', '#Trending'],
            shape: idx % 2 === 0 ? 'spike' : 'up',
            color: idx === 0 ? '#C05A38' : '#C9A96E'
          }));
          setTrends(youtubeTrends);
        } else {
          setTrends(MOCK_TRENDS);
        }
      } catch (error) {
        console.error('Failed to fetch YouTube trends', error);
        setTrends(MOCK_TRENDS);
      } finally {
        setLoading(false);
      }
    } else {
      // For other platforms, use mock data filtered by platform
      if (platform === 'all') setTrends(MOCK_TRENDS);
      else setTrends(MOCK_TRENDS.filter(t => t.platform === platform));
    }
  };

  useEffect(() => {
    fetchRealTrends();
  }, [platform]);

  const filtered = trends.filter(t => {
    const matchCat = category === 'All' || t.tags.includes(category);
    const matchPlat = platform === 'all' || t.platform === platform;
    const matchSearch = search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.hashtags.some(h => h.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchPlat && matchSearch;
  });

  const hotTrends = filtered.filter(t => t.status === 'hot').length;

  const doRefresh = () => {
    setRefreshing(true);
    fetchRealTrends().finally(() => setTimeout(() => setRefreshing(false), 900));
  };

  return (
    <div style={{ padding:'32px 36px 60px', boxSizing:'border-box' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <TrendingUp size={22} color="#C05A38" strokeWidth={2.5} />
            <h1 style={{ fontSize:24, fontWeight:800, color:'#2B2218', margin:0 }}>Trend Detection</h1>
          </div>
          <p style={{ fontSize:14, color:'#7A7068', margin:0 }}>Real-time trending topics across all platforms</p>
        </div>
        <button onClick={doRefresh} style={{
          display:'flex', alignItems:'center', gap:8, padding:'10px 20px',
          borderRadius:999, border:'1.5px solid #EAE4DC', background:'#FAFAF8',
          color:'#2B2218', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit'
        }}>
          <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
          Refresh Live Data
        </button>
      </div>

      {/* Search + Category bar */}
      <div style={{
        background:'#FFFFFF', borderRadius:16, padding:'18px 20px', marginBottom:20,
        border:'1px solid #EAE4DC', boxShadow:'0 1px 8px rgba(43,34,24,0.04)',
        display:'flex', flexDirection:'column', gap:16
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flex:'1', maxWidth:400 }}>
            <Search size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#B0A89C' }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search keywords, hashtags, topics..."
              style={{
                width:'100%', padding:'11px 16px 11px 40px', borderRadius:10,
                border:'1.5px solid #E8E0D4', fontSize:14, color:'#2B2218',
                outline:'none', fontFamily:'inherit', boxSizing:'border-box', background:'#FAFAF8',
              }}
              onFocus={e => e.target.style.borderColor='#D29D8D'}
              onBlur={e => e.target.style.borderColor='#E8E0D4'}
            />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <Filter size={14} color="#B0A89C" />
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding:'6px 14px', borderRadius:999, border:'none',
                background: category === cat ? '#C05A38' : '#F0EBE3',
                color: category === cat ? '#fff' : '#7A7068',
                fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all 150ms'
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Platform tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {PLATFORMS.map(({ id, label, Icon }) => {
            const active = platform === id;
            return (
              <button key={id} onClick={() => setPlatform(id)} style={{
                display:'flex', alignItems:'center', gap:6,
                padding:'8px 16px', borderRadius:999,
                border: active ? '1.5px solid #D29D8D' : '1.5px solid #EAE4DC',
                background: active ? '#FBF3F0' : '#FAFAF8',
                color: active ? '#A8442A' : '#7A7068',
                fontSize:13, fontWeight: active ? 700 : 500,
                cursor:'pointer', fontFamily:'inherit', transition:'all 150ms'
              }}>
                {Icon ? <Icon size={14} /> : <Globe size={14} />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stat Pills */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Trending Topics', value: filtered.length },
          { label:'Avg Spike', value:'220%' },
          { label:'Hot Trends', value: hotTrends },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background:'#FFFFFF', border:'1px solid #EAE4DC', borderRadius:14,
            padding:'16px 20px', boxShadow:'0 1px 6px rgba(43,34,24,0.04)'
          }}>
            <div style={{ fontSize:12, color:'#B0A89C', fontWeight:600, marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:900, color:'#2B2218', letterSpacing:'-1px' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Trend Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#B0A89C', fontSize:15 }}>
          No trends found. Try different filters!
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
          {filtered.map(t => <TrendCard key={t.id} trend={t} />)}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1100px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}