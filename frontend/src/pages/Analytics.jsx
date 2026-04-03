import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Globe, Camera, Video, Users } from 'lucide-react';


/* ─── Safety Icon Components (SVG) ─── */
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

const DATE_RANGES = ['7D', '30D', '90D', 'Custom'];
const PLAT_TABS = [
  { label: 'All Platforms', Icon: Globe },
  { label: 'Instagram',     Icon: Camera },
  { label: 'YouTube',       Icon: Video },
  { label: 'LinkedIn',      Icon: Users },
  { label: 'Twitter',       Icon: TwitterIcon },
];

const kpis = [
  { label: 'Total Reach',      value: '2.4M',    delta: '+12%',  up: true  },
  { label: 'Engagement Rate',  value: '4.8%',    delta: '+0.6%', up: true  },
  { label: 'Watch Time',       value: '18.2K hrs',delta: '+22%', up: true  },
  { label: 'Shares',           value: '84.1K',   delta: '-3%',   up: false },
  { label: 'Follower Growth',  value: '+12.4K',  delta: '+9%',   up: true  },
];

const lineData = [
  { week: 'Week 1', instagram: 18000, youtube: 14000, linkedin: 10000, twitter: 22000 },
  { week: 'Week 2', instagram: 22000, youtube: 18000, linkedin: 12000, twitter: 24000 },
  { week: 'Week 3', instagram: 28000, youtube: 22000, linkedin: 14000, twitter: 26000 },
  { week: 'Week 4', instagram: 38000, youtube: 25000, linkedin: 16000, twitter: 28000 },
  { week: 'Week 5', instagram: 32000, youtube: 28000, linkedin: 15000, twitter: 30000 },
  { week: 'Week 6', instagram: 48000, youtube: 35000, linkedin: 18000, twitter: 28000 },
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
  { name: 'Instagram', value: 45, color: '#C05A38' },
  { name: 'YouTube',   value: 28, color: '#506B40' },
  { name: 'LinkedIn',  value: 15, color: '#C9A96E' },
  { name: 'Twitter',   value: 12,  color: '#3A3028' },
];

const contentTable = [
  { title: 'AI trick that changed my content game forever...', platform: 'Instagram', views: '124.0K', eng: '9.2', v: 88, posted: '2 days ago' },
  { title: "The algorithm doesn't pick winners randomly 🧵", platform: 'Twitter',   views: '87.0K',  eng: '7.8', v: 82, posted: '4 days ago' },
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

const audienceMetrics = [
  { label: 'Gen Z Alignment', score: 92, trend: '+5%' },
  { label: 'Tech Enthusiasts', score: 85, trend: '+12%' },
  { label: 'Creative Pros',   score: 74, trend: '+2%' },
  { label: 'Global Reach',    score: 68, trend: '-1%' },
];

const platColor = { 
  Instagram: { bg:'#FEE8DC', text:'#C05A38' },
  LinkedIn:  { bg:'#FEF8E2', text:'#A87B00' },
  YouTube:   { bg:'#FEF0EA', text:'#A8442A' },
  Twitter:   { bg:'#FEF8E2', text:'#8A7A5A' }
};

const vColor = (v) => v >= 85 ? '#7A9A6E' : v >= 75 ? '#C9A96E' : '#C05A38';

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FFFFFF', borderRadius: 20, border: '1px solid #EAE4DC',
    boxShadow: '0 4px 12px rgba(43,34,24,0.03)', padding: '24px',
    boxSizing: 'border-box', height: '100%', ...style,
  }}>{children}</div>
);

export default function Analytics() {
  const [range, setRange]   = useState('30D');
  const [platTab, setPlatTab] = useState('All Platforms');

  const pill = (active) => ({
    padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
    background: active ? '#C05A38' : 'rgba(192,90,56,0.05)', color: active ? '#fff' : '#C05A38',
    border: 'none', fontSize: 13, fontWeight: active ? 700 : 500, transition: 'all 200ms',
  });

  return (
    <div className="an-root" style={{ width: '100%', padding: '36px', backgroundColor: '#EDE8DF', minHeight: '100vh', boxSizing: 'border-box' }}>

      <style>{`
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

      {/* Header section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', letterSpacing: '-1.2px', lineHeight: 1.1 }}>Analytics</h1>
          <p style={{ fontSize: 15, color: '#7A7068', margin: 0 }}>Comprehensive performance intelligence across your creator ecosystem.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, background: '#FFF', padding: '6px', borderRadius: 999, border: '1px solid #EAE4DC' }}>
          {DATE_RANGES.map(d => <button key={d} style={pill(range === d)} onClick={() => setRange(d)}>{d}</button>)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        {PLAT_TABS.map(p => (
          <button 
            key={p.label} 
            style={{ 
              ...pill(platTab === p.label), 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }} 
            onClick={() => setPlatTab(p.label)}
          >
            <p.Icon size={16} />
            {p.label === 'All Platforms' ? 'Global' : p.label}
          </button>
        ))}
      </div>

      {/* KPI Stats */}
      <div className="an-kpi">
        {kpis.map(k => (
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

      {/* Primary Chart Row */}
      <div className="an-charts-main">
        <Card style={{ padding: '32px' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Impressions Over Time</h3>
            <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Engagement velocity benchmarks per channel</p>
          </div>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE6DE" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12, fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#B0A89C', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #EAE4DC', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />
                <Line type="monotone" dataKey="instagram" stroke="#C05A38" strokeWidth={5} dot={false} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4 }} />
                <Line type="monotone" dataKey="youtube" stroke="#506B40" strokeWidth={5} dot={false} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card style={{ padding: '32px' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Follower Growth</h3>
            <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Net audience expansion index (Last 6 Months)</p>
          </div>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={followerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* Strategy Tier: Middle Row */}
      <div className="an-strategy-row">
        {/* Platform Breakdown */}
        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Platform Breakdown</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Market share by impressions</p>
          <div style={{ height: 180, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donut} innerRadius={60} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                  {donut.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: '#B0A89C' }}>TOTAL</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#2B2218' }}>100%</p>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {donut.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }}></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A4036' }}>{d.name}</span>
                <span style={{ fontSize: 13, color: '#B0A89C', marginLeft: 'auto' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Audience Match Score */}
        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Audience Match Score</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Demographic resonance index</p>
          
          <div style={{ height: 180, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={audienceMetrics} 
                  innerRadius={60} 
                  outerRadius={85} 
                  paddingAngle={8} 
                  dataKey="score" 
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {audienceMetrics.map((e, i) => (
                    <Cell key={i} fill={['#C05A38', '#7A9A6E', '#C9A96E', '#506B40'][i % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#2B2218', lineHeight: 1 }}>84%</p>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: '#B0A89C', marginTop: 4 }}>MATCH</p>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {audienceMetrics.map((m, i) => (
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

        {/* Algorithm Score */}
        <Card>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#2B2218', margin: '0 0 6px' }}>Algorithm Score</h4>
          <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 24px' }}>Real-time platform health scores</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {algoMetrics.map((m, idx) => (
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

      {/* Content Tier: Bottom Full-Width Row */}
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
          {contentTable.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', padding: '20px 0', borderBottom: idx === contentTable.length - 1 ? 'none' : '1px solid #F4F0EB', alignItems: 'center' }}>
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
                  <div style={{ width: `${parseFloat(item.eng) * 8}%`, height: '100%', background: '#7A9A6E' }}></div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7A7068' }}>{item.eng}%</span>
              </div>

              <div style={{ flex: 1.5, textAlign: 'center' }}>
                <span style={{ 
                  fontSize: 13, fontWeight: 800, padding: '6px 14px', borderRadius: 99,
                  background: vColor(item.v) + '15',
                  color: vColor(item.v),
                }}>
                  {item.v}/100</span>
              </div>

              <div style={{ flex: 1.5, textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: '#B0A89C', fontWeight: 500 }}>{item.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
