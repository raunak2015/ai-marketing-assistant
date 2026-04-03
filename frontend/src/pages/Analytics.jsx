import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

/* ─── Safety Icon Components (SVG) ─── */
const SVGIcon = ({ children, size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const UpIcon = (p) => <SVGIcon {...p}><polyline points="7 17 17 7"/><polyline points="7 7 17 7 17 17"/></SVGIcon>;
const DownIcon = (p) => <SVGIcon {...p}><polyline points="7 7 17 17"/><polyline points="17 7 17 17 7 17"/></SVGIcon>;
const GrowIcon = (p) => <SVGIcon {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SVGIcon>;

const DATE_RANGES = ['7D', '30D', '90D', 'Custom'];
const PLAT_TABS = ['All Platforms', 'Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X'];

const kpis = [
  { label: 'Total Reach',      value: '2.4M',    delta: '+12%',  up: true  },
  { label: 'Engagement Rate',  value: '4.8%',    delta: '+0.6%', up: true  },
  { label: 'Watch Time',       value: '18.2K hrs',delta: '+22%', up: true  },
  { label: 'Shares',           value: '84.1K',   delta: '-3%',   up: false },
  { label: 'Follower Growth',  value: '+12.4K',  delta: '+9%',   up: true  },
];

const lineData = [
  { week: 'Week 1', instagram: 18000, youtube: 14000, tiktok: 45000, linkedin: 10000, twitter: 22000 },
  { week: 'Week 2', instagram: 22000, youtube: 18000, tiktok: 55000, linkedin: 12000, twitter: 24000 },
  { week: 'Week 3', instagram: 28000, youtube: 22000, tiktok: 52000, linkedin: 14000, twitter: 26000 },
  { week: 'Week 4', instagram: 38000, youtube: 25000, tiktok: 68000, linkedin: 16000, twitter: 28000 },
  { week: 'Week 5', instagram: 32000, youtube: 28000, tiktok: 72000, linkedin: 15000, twitter: 30000 },
  { week: 'Week 6', instagram: 48000, youtube: 35000, tiktok: 92000, linkedin: 18000, twitter: 28000 },
];

const followerData = [
  { month: 'Jan', followers: 12000 },
  { month: 'Feb', followers: 16000 },
  { month: 'Mar', followers: 20000 },
  { month: 'Apr', followers: 24000 },
  { month: 'May', followers: 30000 },
  { month: 'Jun', followers: 39000 },
];

const donut = [
  { name: 'Instagram', value: 35, color: '#C05A38' },
  { name: 'TikTok',    value: 28, color: '#7A9A6E' },
  { name: 'YouTube',   value: 18, color: '#506B40' },
  { name: 'LinkedIn',  value: 12, color: '#C9A96E' },
  { name: 'X',         value: 7,  color: '#3A3028' },
];

const contentTable = [
  { title: 'AI trick that changed my content game forever...', platform: 'Instagram', views: '124.0K', eng: '9.2', v: 88, posted: '2 days ago' },
  { title: "The algorithm doesn't pick winners randomly 🧵", platform: 'Twitter',   views: '87.0K',  eng: '7.8', v: 82, posted: '4 days ago' },
  { title: 'POV: You cracked the content code 💡',          platform: 'TikTok',    views: '248.0K', eng: '11.4', v: 91, posted: '1 week ago' },
  { title: 'B2B Content Strategy That Actually Works',       platform: 'LinkedIn',  views: '34.0K',  eng: '6.1', v: 74, posted: '1 week ago' },
  { title: 'AI Tools Comparison 2025 | Full Review',        platform: 'YouTube',   views: '89.0K',  eng: '8.3', v: 86, posted: '2 weeks ago' },
];

const algoMetrics = [
  { label: 'Watch Time Retention', score: 78 },
  { label: 'Save Rate',            score: 62 },
  { label: 'Comment Rate',         score: 84 },
  { label: 'Share Rate',           score: 71 },
  { label: 'CTR',                  score: 55 },
];

const platColor = { 
  TikTok:    { bg:'#E6F0E6', text:'#506B40' },
  Instagram: { bg:'#FEE8DC', text:'#C05A38' },
  LinkedIn:  { bg:'#FEF8E2', text:'#A87B00' },
  YouTube:   { bg:'#FEF0EA', text:'#A8442A' },
  Twitter:   { bg:'#FEF8E2', text:'#8A7A5A' },
  X:         { bg:'#FEF8E2', text:'#8A7A5A' }
};

const vColor = (v) => v >= 85 ? '#7A9A6E' : v >= 75 ? '#C9A96E' : '#C05A38';

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FAF9F6', borderRadius: 16, border: '1px solid #EAE4DC',
    boxShadow: '0 1px 8px rgba(43,34,24,0.05)', padding: '22px',
    boxSizing: 'border-box', ...style,
  }}>{children}</div>
);

export default function Analytics() {
  const [range, setRange]   = useState('30D');
  const [platTab, setPlatTab] = useState('All Platforms');

  const pill = (active) => ({
    padding: '7px 15px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
    background: active ? '#C05A38' : '#F0EBE3', color: active ? '#fff' : '#7A7068',
    border: 'none', fontSize: 13, fontWeight: active ? 600 : 400, transition: 'all 150ms',
  });

  return (
    <div className="an-root" style={{ width: '100%', padding: '20px', backgroundColor: '#F8F5F0', minHeight: '100vh', boxSizing: 'border-box' }}>
      <style>{`
        .an-kpi { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .chart-row { display: flex; gap: 24px; flex-wrap: wrap; }
        .an-stats-row { display: flex; gap: 24px; flex-wrap: wrap; }
        @media (max-width: 1200px) { .chart-row, .an-stats-row { flex-direction: column; } .an-stats-row > div { flex: 1 !important; } }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.8px' }}>Analytics</h1>
          <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Your cross-platform performance at a glance.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {DATE_RANGES.map(d => <button key={d} style={pill(range === d)} onClick={() => setRange(d)}>{d}</button>)}
        </div>
      </div>

      {/* Platform tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
        {PLAT_TABS.map(p => <button key={p} style={pill(platTab === p)} onClick={() => setPlatTab(p)}>{p}</button>)}
      </div>

      {/* KPI row */}
      <div className="an-kpi" style={{ marginBottom: 24 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ padding: '18px 18px' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.1em', margin: '0 0 8px' }}>{k.label.toUpperCase()}</p>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.5px' }}>{k.value}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {k.up ? <UpIcon size={12} color="#7A9A6E" /> : <DownIcon size={12} color="#C05A38" />}
              <span style={{ fontSize: 12, fontWeight: 600, color: k.up ? '#7A9A6E' : '#C05A38' }}>{k.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="an-main-suite" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* ROW 1: PRIMARY CHARTS (Side-by-Side) */}
        <div className="chart-row">
          <Card style={{ flex: 1, minWidth: '400px', padding: '24px' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#2B2218', margin: '0 0 4px' }}>Impressions Over Time</h3>
              <p style={{ fontSize: 13, color: '#7A7068', margin: 0 }}>Views across all selected channels (Last 30 days)</p>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 11 }} dy={10} />
                  <YAxis hide domain={[0, 'dataMax + 10000']} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '12px' }} />
                  <Line type="monotone" dataKey="tiktok"    stroke="#7A9A6E" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="instagram" stroke="#C05A38" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card style={{ flex: 1, minWidth: '400px', padding: '24px' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#2B2218', margin: '0 0 4px' }}>Follower Growth</h3>
              <p style={{ fontSize: 13, color: '#7A7068', margin: 0 }}>Net new audience (Last 6 months)</p>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={followerData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#C9A96E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 11 }} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '12px' }} />
                  <Area type="monotone" dataKey="followers" stroke="#C9A96E" strokeWidth={4} fillOpacity={1} fill="url(#colorF)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* ROW 2: TIERED INSIGHTS (Donut + Bars + List) */}
        <div className="an-stats-row">
          <Card style={{ flex: '0 0 320px' }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#2B2218', margin: '0 0 4px' }}>Platform Breakdown</h4>
            <p style={{ fontSize: 12, color: '#7A7068', margin: '0 0 20px' }}>Reach distribution by network</p>
            <div style={{ height: 180, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donut} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                    {donut.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#B0A89C' }}>TOTAL</p>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#2B2218' }}>100%</p>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {donut.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }}></div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#4A4036' }}>{d.name}</span>
                  <span style={{ fontSize: 12, color: '#7A7068', marginLeft: 'auto' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ flex: 1 }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#2B2218', margin: '0 0 4px' }}>Top Performing Content</h4>
            <p style={{ fontSize: 12, color: '#7A7068', margin: '0 0 20px' }}>Posts that outperformed the average index</p>
            <div style={{ display: 'flex', borderBottom: '1px solid #EAE4DC', paddingBottom: 10, marginBottom: 12 }}>
              <span style={{ flex: 3, fontSize: 11, fontWeight: 700, color: '#B0A89C' }}>CONTENT TITLE</span>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#B0A89C', textAlign: 'center' }}>VIEWS</span>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#B0A89C', textAlign: 'center' }}>ENG.</span>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#B0A89C', textAlign: 'right' }}>VIRALITY</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contentTable.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', padding: '14px 0', borderBottom: idx === contentTable.length - 1 ? 'none' : '1px solid #F4F0EB', alignItems: 'center' }}>
                  <div style={{ flex: 3 }}>
                    <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#2B2218', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                        background: platColor[item.platform]?.bg || '#EEE',
                        color: platColor[item.platform]?.text || '#666'
                      }}>{item.platform.toUpperCase()}</span>
                      <span style={{ fontSize: 11, color: '#B0A89C' }}>Posted {item.posted}</span>
                    </div>
                  </div>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#4A4036' }}>{item.views}</span>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#7A9A6E' }}>{item.eng}%</span>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: vColor(item.v) }}>{item.v}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ flex: '0 0 320px' }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#2B2218', margin: '0 0 4px' }}>AI Insights</h4>
            <p style={{ fontSize: 12, color: '#7A7068', margin: '0 0 20px' }}>Algorithmic health scores</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {algoMetrics.map((m, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#4A4036' }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: vColor(m.score) }}>{m.score}%</span>
                  </div>
                  <div style={{ height: 6, background: '#F0EBE3', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${m.score}%`, height: '100%', background: vColor(m.score), borderRadius: 3 }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 26, padding: '16px', background: '#FEF8E2', borderRadius: 12, border: '1px solid #F9EBC8' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <GrowIcon size={16} color="#A87B00" />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#A87B00' }}>Algorithm Forecast</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#8A7A5A', lineHeight: 1.5 }}>Your high "Comment Rate" is triggering the TikTok FYP loop. Post a follow-up story to maintain momentum.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
