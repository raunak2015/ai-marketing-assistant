import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

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
  { day: 'Mon', Instagram: 4200, YouTube: 1800, TikTok: 6200, LinkedIn: 900 },
  { day: 'Tue', Instagram: 3900, YouTube: 2100, TikTok: 5800, LinkedIn: 780 },
  { day: 'Wed', Instagram: 5100, YouTube: 2400, TikTok: 7200, LinkedIn: 1100 },
  { day: 'Thu', Instagram: 4700, YouTube: 1900, TikTok: 6800, LinkedIn: 970 },
  { day: 'Fri', Instagram: 6200, YouTube: 3100, TikTok: 8500, LinkedIn: 1400 },
  { day: 'Sat', Instagram: 5800, YouTube: 2800, TikTok: 9100, LinkedIn: 800 },
  { day: 'Sun', Instagram: 7200, YouTube: 3400, TikTok: 10200,LinkedIn: 920 },
];

const donut = [
  { name: 'Instagram', value: 35, color: '#C05A38' },
  { name: 'TikTok',    value: 28, color: '#7A9A6E' },
  { name: 'YouTube',   value: 18, color: '#506B40' },
  { name: 'LinkedIn',  value: 12, color: '#C9A96E' },
  { name: 'X',         value: 7,  color: '#3A3028' },
];

const contentTable = [
  { title: 'How to Go Viral in 2025',           platform: 'TikTok',    reach: '840K', eng: '6.2%', v: 94 },
  { title: 'AI Content Strategy Guide',          platform: 'LinkedIn',  reach: '120K', eng: '3.8%', v: 72 },
  { title: 'Morning Routine Changed My Life',    platform: 'Instagram', reach: '380K', eng: '5.1%', v: 88 },
  { title: 'Behind the Scenes: Studio Setup',    platform: 'YouTube',   reach: '210K', eng: '4.4%', v: 65 },
  { title: '#TrendChallenge Compilation',         platform: 'TikTok',   reach: '1.2M', eng: '7.8%', v: 97 },
];

const algoMetrics = [
  { label: 'Watch Time Retention', score: 78 },
  { label: 'Save Rate',            score: 62 },
  { label: 'Comment Rate',         score: 84 },
  { label: 'Share Rate',           score: 71 },
  { label: 'CTR',                  score: 55 },
];

const platColor = { TikTok:'#7A9A6E', Instagram:'#C05A38', LinkedIn:'#C9A96E', YouTube:'#506B40', X:'#3A3028' };
const vColor = (v) => v >= 85 ? '#C05A38' : v >= 65 ? '#C9A96E' : '#7A9A6E';

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
    <div className="an-root">
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
      <div className="an-kpi" style={{ marginBottom: 20 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ padding: '18px 18px' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.1em', margin: '0 0 8px' }}>{k.label.toUpperCase()}</p>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.5px' }}>{k.value}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {k.up
                ? <ArrowUpRight size={13} style={{ color: '#7A9A6E' }}/>
                : <ArrowDownRight size={13} style={{ color: '#C05A38' }}/>}
              <span style={{ fontSize: 12, fontWeight: 600, color: k.up ? '#7A9A6E' : '#C05A38' }}>{k.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="an-main">
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Line chart */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Engagement Over Time</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B0A89C' }}><MoreHorizontal size={16}/></button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE4DC" vertical={false}/>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#B0A89C' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#B0A89C' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`}/>
                <Tooltip contentStyle={{ background: '#FAF7F2', border: '1px solid #DDD6CA', borderRadius: 10, fontSize: 12 }}/>
                <Line type="monotone" dataKey="Instagram" stroke="#C05A38" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="TikTok"    stroke="#7A9A6E" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="YouTube"   stroke="#506B40" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="LinkedIn"  stroke="#C9A96E" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
              {Object.entries(platColor).filter(([p]) => p !== 'X').map(([p, c]) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }}/>
                  <span style={{ fontSize: 11, color: '#7A7068' }}>{p}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Content table */}
          <Card style={{ overflowX: 'auto' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 16px' }}>Content Performance</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EAE4DC' }}>
                  {['Title','Platform','Reach','Engagement','Virality'].map(h => (
                    <th key={h} style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.08em', paddingBottom: 10, textAlign: 'left', paddingRight: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contentTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < contentTable.length - 1 ? '1px solid #F5F2EE' : 'none', cursor: 'pointer' }}>
                    <td style={{ padding: '11px 12px 11px 0', color: '#2B2218', fontWeight: 500, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.title}</td>
                    <td style={{ paddingRight: 12 }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, background: platColor[row.platform], color: '#fff', fontWeight: 600 }}>{row.platform}</span>
                    </td>
                    <td style={{ paddingRight: 12, fontWeight: 600, color: '#2B2218' }}>{row.reach}</td>
                    <td style={{ paddingRight: 12, color: '#7A7068' }}>{row.eng}</td>
                    <td>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 12, background: vColor(row.v) + '18', color: vColor(row.v), fontWeight: 700 }}>{row.v}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Donut */}
          <Card>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 16px' }}>Platform Breakdown</h2>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={donut} innerRadius={52} outerRadius={76} dataKey="value" paddingAngle={3}>
                  {donut.map((d, i) => <Cell key={i} fill={d.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ background: '#FAF7F2', border: '1px solid #DDD6CA', borderRadius: 10, fontSize: 12 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {donut.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: d.color }}/>
                    <span style={{ fontSize: 13, color: '#2B2218' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#C05A38' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Algorithm Score */}
          <Card>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 16px' }}>Algorithm Score</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {algoMetrics.map(m => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: '#7A7068' }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#C05A38' }}>{m.score}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 999, background: '#E8E0D4', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 999, width: `${m.score}%`, background: 'linear-gradient(90deg, #C05A38, #C9A96E)' }}/>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Audience Match */}
          <Card style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 16px', textAlign: 'left' }}>Audience Match Score</h2>
            <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 16px' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E8E0D4" strokeWidth="8"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#C05A38" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.84} ${2 * Math.PI * 42}`} strokeLinecap="round"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#2B2218' }}>84%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Gen Z 18–24', 'Urban creators', 'Tech-savvy'].map(t => (
                <span key={t} style={{ padding: '5px 12px', borderRadius: 999, fontSize: 12, background: '#F0EBE3', color: '#2B2218' }}>{t}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        .an-root { padding: 32px 36px 48px; position: relative; z-index: 1; box-sizing: border-box; }
        .an-kpi  { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .an-main { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; align-items: start; }
        @media (max-width: 1024px) {
          .an-kpi  { grid-template-columns: repeat(3, 1fr); }
          .an-main { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .an-root { padding: 18px 14px 40px; }
          .an-kpi  { grid-template-columns: repeat(2, 1fr); }
          h1 { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
}
