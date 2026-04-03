import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, RefreshCw, Download, Search, Map, 
  Users, Music, 
  Clock, ArrowUpRight, ArrowDownRight, Share2, 
  ChevronRight, PlayCircle, Layers, Star, Zap, Leaf,
  Camera, Play, Globe, MessageSquare // Fallbacks
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';

/* ─── CUSTOM SOCIAL ICONS ─── */
const Instagram = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const Youtube = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const Twitter = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

/* ─── COLORS ─── */
const COLORS = {
  bg: '#EDE8DF',
  card: '#FAF7F2',
  chip: '#E8E0D4',
  primary: '#C05A38',
  positive: '#7A9A6E',
  secondary: '#C9A96E',
  dark: '#506B40',
  text: '#2B2218',
  muted: '#7A7068',
  divider: '#DDD6CA',
  platforms: {
    Instagram: '#C05A38',
    YouTube: '#C9A96E',
    LinkedIn: '#506B40',
    X: '#7A7068'
  }
};

/* ─── DUMMY DATA ─── */
const TICKER_ITEMS = [
  { text: "#AIContent trending on Instagram", type: "hot" },
  { text: "LinkedIn Carousel Tips rising fast", type: "rising" },
  { text: "Viral audio 'Summer Loop' on YouTube", type: "audio" },
  { text: "#GrowthHacking trending on Twitter/X", type: "hot" },
  { text: "Organic skincare trends peaking", type: "rising" }
];

const TRENDS = [
  { id: 1, topic: "AI Image Generation", platform: "Instagram", tag: "Viral", volume: "85.2K", growth: "+142%", up: true },
  { id: 2, topic: "Micro-SaaS Strategy", platform: "LinkedIn", tag: "Rising Fast", volume: "42.1K", growth: "+88%", up: true },
  { id: 3, topic: "Lofi Beats 2025", platform: "YouTube", tag: "Emerging", volume: "120.5K", growth: "+64%", up: true },
  { id: 4, topic: "Personal Branding Tips", platform: "LinkedIn", tag: "Rising Fast", volume: "22.8K", growth: "+34%", up: true },
  { id: 5, topic: "Web3 Rebirth", platform: "X", tag: "Emerging", volume: "15.4K", growth: "+12%", up: true },
  { id: 6, topic: "Crypto Regulations", platform: "X", tag: "Fading", volume: "9.2K", growth: "-18%", up: false },
  { id: 7, topic: "Vertical Gardening", platform: "Instagram", tag: "Viral", volume: "67.3K", growth: "+115%", up: true },
  { id: 8, topic: "Next.js 16 Features", platform: "YouTube", tag: "Rising Fast", volume: "31.0K", growth: "+45%", up: true },
  { id: 9, topic: "Quiet Quitting v2", platform: "LinkedIn", tag: "Fading", volume: "18.5K", growth: "-12%", up: false },
  { id: 10, topic: "Solar Energy Hubs", platform: "YouTube", tag: "Emerging", volume: "25.2K", growth: "+21%", up: true },
];

const MOMENTUM_DATA = [
  { name: 'Mon', Instagram: 4000, YouTube: 2400, LinkedIn: 2400, X: 1200 },
  { name: 'Tue', Instagram: 3000, YouTube: 1398, LinkedIn: 2210, X: 1100 },
  { name: 'Wed', Instagram: 2000, YouTube: 9800, LinkedIn: 2290, X: 1400 },
  { name: 'Thu', Instagram: 2780, YouTube: 3908, LinkedIn: 2000, X: 1600 },
  { name: 'Fri', Instagram: 1890, YouTube: 4800, LinkedIn: 2181, X: 1300 },
  { name: 'Sat', Instagram: 2390, YouTube: 3800, LinkedIn: 2500, X: 2100 },
  { name: 'Sun', Instagram: 3490, YouTube: 4300, LinkedIn: 2100, X: 1900 },
];

const FORMATS = [
  { name: "Reels 15–30s", platform: "Instagram", bestFor: "Reach", usage: 82, count: "8.2K" },
  { name: "YT Shorts 50–60s", platform: "YouTube", bestFor: "Retention", usage: 65, count: "5.4K" },
  { name: "LinkedIn Carousels", platform: "LinkedIn", bestFor: "Authority", usage: 48, count: "3.1K" },
];

const HASHTAGS = [
  { tag: "#AIArt", size: "lg" },
  { tag: "#FutureOfWork", size: "md" },
  { tag: "#SustainableLiving", size: "lg" },
  { tag: "#CreatorEconomy", size: "md" },
  { tag: "#GrowthHacking", size: "sm" },
  { tag: "#WebDevelopment", size: "sm" },
  { tag: "#Marketing2025", size: "md" },
  { tag: "#SolarEnergy", size: "sm" },
];

const CREATORS = [
  { name: "Alex Rivera", niche: "Tech", trend: "AI Tools", followers: "145K", initials: "AR" },
  { name: "Sarah Chen", niche: "Business", trend: "Solopreneur", followers: "82K", initials: "SC" },
  { name: "Jordan Smith", niche: "Lifestyle", trend: "Slow Living", followers: "210K", initials: "JS" },
];

/* ─── COMPONENTS ─── */

const Card = ({ title, children, extra, style = {} }) => (
  <div style={{
    background: COLORS.card,
    borderRadius: 20,
    padding: 24,
    border: `1px solid ${COLORS.divider}`,
    boxShadow: '0 4px 20px rgba(43,34,24,0.04)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...style
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: 0 }}>{title}</h3>
      {extra}
    </div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const Badge = ({ text, color, bgColor, dot }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    background: bgColor || COLORS.chip,
    color: color || COLORS.muted,
    whiteSpace: 'nowrap'
  }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }}/>}
    {text.toUpperCase()}
  </span>
);

const PlatformBadge = ({ platform }) => (
  <span style={{
    padding: '2px 8px',
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    background: COLORS.platforms[platform],
    color: 'white'
  }}>
    {platform}
  </span>
);

const TrendChip = ({ type }) => {
  const styles = {
    "Viral": { bg: COLORS.primary, color: 'white', icon: '🔥' },
    "Rising Fast": { bg: COLORS.positive, color: 'white', icon: '📈' },
    "Emerging": { bg: COLORS.secondary, color: 'white', icon: '⚡' },
    "Fading": { bg: COLORS.muted, color: 'white', icon: '💀' }
  };
  const s = styles[type] || styles["Emerging"];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      borderRadius: 999,
      fontSize: 10,
      fontWeight: 700,
      background: s.bg,
      color: s.color,
      animation: type === 'Viral' ? 'pulse 2s infinite' : 'none'
    }}>
      {s.icon} {type}
    </span>
  );
};

export default function TrendDetection() {
  const [activeTab, setActiveTab] = useState('All Platforms');
  const [activeRange, setActiveRange] = useState('Today');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTrends = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg }}>
      
      {/* ─── HEADER BAR ─── */}
      <div style={{ padding: '24px 40px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: '0 0 4px' }}>Trend Detection</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: COLORS.muted }}>Last updated: 2 min ago</span>
            <button onClick={refreshTrends} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.primary, display: 'flex', alignItems: 'center' }}>
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''}/>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: COLORS.chip, padding: 4, borderRadius: 999 }}>
            {['Today', 'This Week', 'This Month'].map(range => (
              <button key={range} onClick={() => setActiveRange(range)}
                style={{
                  padding: '6px 16px', borderRadius: 999, border: 'none',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: activeRange === range ? COLORS.primary : 'transparent',
                  color: activeRange === range ? 'white' : COLORS.muted,
                  transition: 'all 200ms'
                }}>
                {range}
              </button>
            ))}
          </div>
          <button style={{
            padding: '8px 18px', borderRadius: 999, border: `1.5px solid ${COLORS.divider}`,
            background: 'transparent', color: COLORS.text, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <Download size={14}/> Export Trends
          </button>
        </div>
      </div>

      {/* ─── PLATFORM FILTER TABS ─── */}
      <div style={{ padding: '0 40px', marginBottom: 0 }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12 }} className="no-scrollbar">
          {[
            { label: 'All Platforms', icon: <TrendingUp size={16}/> },
            { label: 'Instagram', icon: <Instagram size={16}/> },
            { label: 'YouTube', icon: <Youtube size={16}/> },
            { label: 'LinkedIn', icon: <Linkedin size={16}/> },
            { label: 'Twitter/X', icon: <Twitter size={16}/> }
          ].map(p => {
            const active = activeTab === p.label;
            return (
              <button key={p.label} onClick={() => setActiveTab(p.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 999, border: 'none',
                  whiteSpace: 'nowrap', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  background: active ? COLORS.primary : COLORS.chip,
                  color: active ? 'white' : COLORS.muted,
                  transition: 'all 200ms'
                }}>
                {p.icon}
                {p.label}
              </button>
            );
          })}
        </div>
        <div style={{ height: 1, background: COLORS.divider, width: '100%' }}/>
      </div>

      {/* ─── REAL-TIME TICKER STRIP ─── */}
      <div style={{ height: 36, background: COLORS.chip, overflow: 'hidden', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="ticker-animate" style={{ display: 'flex', whiteSpace: 'nowrap', gap: 40, padding: '0 20px' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: 13, color: COLORS.text, display: 'flex', alignItems: 'center', gap: 6 }}>
              {item.type === 'hot' && <span style={{ color: COLORS.primary }}>🔥</span>}
              {item.type === 'rising' && <span style={{ color: COLORS.positive }}>📈</span>}
              {item.type === 'audio' && <span style={{ color: COLORS.primary }}>🎵</span>}
              {item.text.split(' ').map((word, idx) => 
                ['Instagram', 'LinkedIn', 'YouTube', 'Twitter/X', 'trending', 'rising'].includes(word) 
                ? <b key={idx} style={{ color: COLORS.primary }}>{word} </b> 
                : word + ' '
              )}
              <span style={{ color: COLORS.divider, margin: '0 10px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── AI INSIGHT BANNER ─── */}
      <div style={{ padding: '24px 40px 0' }}>
        <div style={{
          background: COLORS.card, borderRadius: 16, border: `1px dotted ${COLORS.primary}`,
          padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(192,90,56,0.05)', flexWrap: 'wrap', gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF0EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} style={{ color: COLORS.primary }}/>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.text, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700 }}>AI Insight:</span> <span style={{ color: COLORS.primary, fontWeight: 700 }}>#AITools</span> is trending across all 4 platforms right now. Create content today for maximum reach.
            </p>
          </div>
          <button style={{
            background: COLORS.primary, color: 'white', border: 'none', 
            borderRadius: 999, padding: '10px 24px', fontSize: 13, fontWeight: 700, 
            cursor: 'pointer', transition: 'all 200ms'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#A8442A'}
          onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}>
            Create Content Now →
          </button>
        </div>
      </div>

      {/* ─── MAIN CONTENT GRID ─── */}
      <div style={{ padding: '24px 40px 48px' }}>
        <div className="trend-bento-grid">
          
          {/* COLUMN 1: Trending Topics */}
          <div className="bento-col-1">
            <Card title="🔥 Trending Topics" extra={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: COLORS.muted }}/>
                  <input type="text" placeholder="Search topics..." style={{
                    padding: '6px 12px 6px 30px', borderRadius: 999, border: 'none',
                    background: COLORS.chip, fontSize: 12, color: COLORS.text, outline: 'none',
                    width: 140
                  }}/>
                </div>
              </div>
            }>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                {['All', 'Tech', 'Lifestyle', 'Business', 'Health'].map(cat => (
                  <button key={cat} style={{
                    padding: '4px 12px', borderRadius: 999, border: `1.2px solid ${cat === 'All' ? COLORS.primary : COLORS.divider}`,
                    background: 'transparent', color: cat === 'All' ? COLORS.primary : COLORS.muted,
                    fontSize: 10, fontWeight: 700, cursor: 'pointer'
                  }}>{cat.toUpperCase()}</button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {TRENDS.map((t, idx) => (
                  <div key={t.id} className="trend-row" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 12px', borderRadius: 12, borderBottom: idx < TRENDS.length - 1 ? `1px solid ${COLORS.divider}` : 'none',
                    transition: 'all 200ms', cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.primary, width: 24 }}>#{idx + 1}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{t.topic}</span>
                          <PlatformBadge platform={t.platform}/>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <TrendChip type={t.tag}/>
                          <span style={{ fontSize: 11, color: COLORS.muted }}>{t.volume} interactions</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        fontSize: 13, fontWeight: 700, 
                        color: t.up ? COLORS.positive : COLORS.primary,
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2
                      }}>
                        {t.up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                        {t.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                width: '100%', padding: '12px', borderRadius: 999, background: 'transparent',
                border: 'none', color: COLORS.muted, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                marginTop: 10
              }}>Load More</button>
            </Card>
          </div>

          {/* COLUMN 2: Momentum & Formats */}
          <div className="bento-col-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
              <Card title="📊 Trend Momentum Graph">
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                  {Object.entries(COLORS.platforms).map(([p, color]) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }}/>
                      <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <LineChart data={MOMENTUM_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider}/>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.muted }}/>
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.muted }}/>
                      <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.divider}`, borderRadius: 12, fontSize: 11 }}/>
                      <Line type="monotone" dataKey="Instagram" stroke={COLORS.platforms.Instagram} strokeWidth={2.5} dot={false} activeDot={{ r: 6 }}/>
                      <Line type="monotone" dataKey="YouTube" stroke={COLORS.platforms.YouTube} strokeWidth={2.5} dot={false} activeDot={{ r: 6 }}/>
                      <Line type="monotone" dataKey="LinkedIn" stroke={COLORS.platforms.LinkedIn} strokeWidth={2.5} dot={false} activeDot={{ r: 6 }}/>
                      <Line type="monotone" dataKey="X" stroke={COLORS.platforms.X} strokeWidth={2.5} dot={false} activeDot={{ r: 6 }}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="🎵 Trending Audio & Formats">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {FORMATS.map((f, i) => (
                    <div key={i} style={{
                      background: COLORS.chip, borderRadius: 12, padding: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(192,90,56,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {f.platform === 'Instagram' ? <PlayCircle size={18} style={{ color: COLORS.primary }}/> : <Layers size={18} style={{ color: COLORS.positive }}/>}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{f.name}</span>
                            <PlatformBadge platform={f.platform}/>
                          </div>
                          <p style={{ margin: '0 0 6px', fontSize: 11, color: COLORS.muted }}>Best for: <span style={{ fontWeight: 600 }}>{f.bestFor}</span></p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 100, height: 5, background: 'rgba(43,34,24,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                              <div style={{ width: `${f.usage}%`, height: '100%', background: COLORS.primary }}/>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.text }}>{f.count} uses</span>
                          </div>
                        </div>
                      </div>
                      <button style={{
                        background: 'transparent', border: 'none', color: COLORS.primary,
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                      }}>Use This <ChevronRight size={14}/></button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* COLUMN 3: Hashtags, Region, Creators */}
          <div className="bento-col-3">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
              <Card title="#️⃣ Trending Hashtags">
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  {['All', 'IG', 'YT', 'LI', 'X'].map(p => (
                    <button key={p} style={{
                      padding: '3px 8px', borderRadius: 4, background: p === 'All' ? COLORS.primary : COLORS.chip,
                      color: p === 'All' ? 'white' : COLORS.muted, border: 'none', fontSize: 10, fontWeight: 700, cursor: 'pointer'
                    }}>{p}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {HASHTAGS.map((h, i) => (
                    <button key={i} style={{
                      padding: h.size === 'lg' ? '8px 16px' : h.size === 'md' ? '6px 14px' : '4px 12px',
                      borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 200ms',
                      background: h.size === 'lg' ? COLORS.primary : h.size === 'md' ? COLORS.secondary : COLORS.chip,
                      color: h.size === 'lg' ? 'white' : h.size === 'md' ? COLORS.text : COLORS.muted,
                      fontSize: h.size === 'lg' ? 14 : h.size === 'md' ? 13 : 12,
                      fontWeight: h.size === 'lg' ? 700 : 500
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
                      {h.tag}
                    </button>
                  ))}
                </div>
                <button style={{
                  background: 'none', border: 'none', color: COLORS.primary, cursor: 'pointer',
                  fontSize: 12, fontWeight: 700, marginTop: 16, padding: 0
                }}>Copy Top 10</button>
              </Card>

              <Card title="🌍 Trending by Region">
                <div style={{ display: 'flex', marginBottom: 12 }}>
                  {['All', 'IG', 'YT', 'LI', 'X'].map(p => (
                    <button key={p} style={{ padding: '0 8px', background: 'none', border: 'none', color: p === 'All' ? COLORS.primary : COLORS.muted, fontSize: 10, fontWeight: 700 }}>{p}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { flag: "🇺🇸", country: "USA", topic: "AI Safety", vol: "1.2M" },
                    { flag: "🇮🇳", country: "India", topic: "SaaS", vol: "850K" },
                    { flag: "🇬🇧", country: "UK", topic: "Fintech", vol: "420K" },
                    { flag: "🇦🇺", country: "Australia", topic: "Logistics", vol: "140K" },
                  ].map((r, i) => (
                    <div key={i} className="region-row" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 10px', borderRadius: 8, transition: 'background 200ms', cursor: 'pointer'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 16 }}>{r.flag}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{r.country}</div>
                          <div style={{ fontSize: 11, color: COLORS.muted }}>Top topic: {r.topic}</div>
                        </div>
                      </div>
                      <Badge text={r.vol} bgColor={COLORS.chip} color={COLORS.muted}/>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="👥 Creator Spotlights">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {CREATORS.map((c, i) => (
                    <div key={i} className="creator-row" style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '8px 10px', borderRadius: 8, transition: 'background 200ms', cursor: 'pointer'
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', background: COLORS.primary,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: 14
                      }}>{c.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{c.name}</span>
                          <span style={{ fontSize: 11, color: COLORS.muted }}>{c.followers}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Badge text={c.niche}/>
                          <Badge text={c.trend} color={COLORS.primary} bgColor="#FEF0EA"/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PLATFORM DEEP DIVE ─── */}
      <div style={{ padding: '0 40px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="platform-deep-dive">
          
          {/* IG Card */}
          <Card title="Instagram Trends" extra={<Instagram size={18} style={{ color: COLORS.platforms.Instagram }}/>}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {['#OOTD', '#Lifestyle', '#Aesthetic'].map(t => <Badge key={t} text={t} color={COLORS.primary} bgColor="#FEF0EA"/>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>Reels 15–30s</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>Saves & shares driving reach</p>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <Badge text="Aesthetic Lifestyle"/>
              <Badge text="AI & Tech"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: COLORS.primary, fontWeight: 700 }}>
              <Clock size={14}/> Best at 6–9PM IST
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <button style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 0 }}>Explore Trends →</button>
            </div>
          </Card>

          {/* YT Card */}
          <Card title="YouTube Trends" extra={<Youtube size={18} style={{ color: COLORS.platforms.YouTube }}/>}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {['SaaS', 'Marketing', 'AI Tools'].map(t => <Badge key={t} text={t} color={COLORS.secondary} bgColor="#FAF3E8"/>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>YT Shorts 50–60s</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>Watch time retention is key</p>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <Badge text="How-To"/>
              <Badge text="Tech Reviews"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: COLORS.primary, fontWeight: 700 }}>
              <Clock size={14}/> Best at 2–5PM IST
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <button style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 0 }}>Explore Trends →</button>
            </div>
          </Card>

          {/* LI Card */}
          <Card title="LinkedIn Trends" extra={<Linkedin size={18} style={{ color: COLORS.platforms.LinkedIn }}/>}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {['B2B', 'Leadership', 'RemoteWork'].map(t => <Badge key={t} text={t} color={COLORS.dark} bgColor="#E8F4E8"/>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>Carousel Posts (5–8 slides)</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>Thought leadership performs well</p>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <Badge text="AI & Startups"/>
              <Badge text="Career Growth"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: COLORS.primary, fontWeight: 700 }}>
              <Clock size={14}/> Best at 8–10AM IST
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <button style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 0 }}>Explore Trends →</button>
            </div>
          </Card>

          {/* X Card */}
          <Card title="Twitter / X Trends" extra={<Twitter size={18} style={{ color: COLORS.platforms.X }}/>}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {['#AI', '#Web3', '#Startups'].map(t => <Badge key={t} text={t} color={COLORS.muted} bgColor="#F0F0F0"/>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>Threads (5–7 tweets)</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>Conversation hooks driving replies</p>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <Badge text="Breaking News"/>
              <Badge text="Finance"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: COLORS.primary, fontWeight: 700 }}>
              <Clock size={14}/> Best at 7–9AM IST
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <button style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 0 }}>Explore Trends →</button>
            </div>
          </Card>

        </div>
      </div>

      {/* ─── STYLES ─── */}
      <style>{`
        .trend-bento-grid {
          display: grid;
          grid-template-columns: 0.38fr 0.38fr 0.24fr;
          gap: 20px;
          align-items: start;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .ticker-animate {
          animation: ticker 40s linear infinite;
        }

        .ticker-animate:hover {
          animation-play-state: paused;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }

        .trend-row:hover, .region-row:hover, .creator-row:hover {
          background: ${COLORS.chip};
        }

        @media (max-width: 1024px) {
          .trend-bento-grid {
            grid-template-columns: 1fr 1fr;
          }
          .platform-deep-dive {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .trend-bento-grid {
            grid-template-columns: 1fr;
          }
          .platform-deep-dive {
            grid-template-columns: 1fr;
          }
          header, div[style*="padding: 24px 40px"] {
            padding: 16px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
