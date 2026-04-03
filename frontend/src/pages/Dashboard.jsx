import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { MoreHorizontal } from 'lucide-react';

/* ─────────────── DATA ─────────────── */
const barData = [
  { name: 'IG', v: 420, color: '#C05A38' },
  { name: 'TT', v: 560, color: '#7A9A6E' },
  { name: 'LI', v: 210, color: '#C9A96E' },
  { name: 'FB', v: 290, color: '#506B40' },
];

const engData = [
  { t: 'M', org: 3200, vir: 2100 },
  { t: 'T', org: 3900, vir: 2600 },
  { t: 'W', org: 3000, vir: 3600 },
  { t: 'T', org: 4300, vir: 3100 },
  { t: 'F', org: 5100, vir: 4400 },
  { t: 'S', org: 4600, vir: 5200 },
  { t: 'S', org: 6200, vir: 5800 },
];

const aiRecs = [
  { emoji: '🌱', body: 'Post carousels with ', hl: '#growth',     tail: ' tagging.' },
  { emoji: '🌿', body: 'Update bio to include ', hl: 'CTA links', tail: '.' },
  { emoji: '🪴', body: 'Collaborate with ',      hl: 'Top 3',      tail: ' partners.' },
  { emoji: '🍃', body: 'A/B test ',              hl: 'Linen',      tail: ' color themes.' },
];

const stats = [
  { label: 'REACH',  val: '14.2K', Icon: ReachIcon },
  { label: 'VIEWS',  val: '8.9K',  Icon: ViewsIcon },
  { label: 'CLICKS', val: '2.4K',  Icon: ClicksIcon },
  { label: 'GROWTH', val: '+5.1%', Icon: GrowthIcon },
];

const performers = [
  { name: 'Alex Rivera',  score: '9.4k', pct: 94 },
  { name: 'Jordan Smith', score: '7.2k', pct: 72 },
  { name: 'Sarah Chen',   score: '6.8k', pct: 68 },
];

/* ─────────────── SMALL PLATFORM SVG ICONS ─────────────── */
function ReachIcon() {
  return (
    <div style={iconBox('#C05A38')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C05A38" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </div>
  );
}
function ViewsIcon() {
  return (
    <div style={iconBox('#7A9A6E')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A9A6E" strokeWidth="2.5" strokeLinecap="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    </div>
  );
}
function ClicksIcon() {
  return (
    <div style={iconBox('#C9A96E')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    </div>
  );
}
function GrowthIcon() {
  return (
    <div style={iconBox('#506B40')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#506B40" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    </div>
  );
}
const iconBox = (color) => ({
  width: 28, height: 28, borderRadius: 8,
  background: color + '18',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

/* ─────────────── GAUGE ─────────────── */
function Gauge({ score }) {
  const R = 76, cx = 100, cy = 100;
  const circ = Math.PI * R;
  const filled = (score / 100) * circ;

  /* needle angle: -180° (left) .. 0° (right) */
  const angleDeg = -180 + (score / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const nx = cx + R * Math.cos(angleRad);
  const ny = cy + R * Math.sin(angleRad);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '10px 0' }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#C9A96E"/>
            <stop offset="60%"  stopColor="#C05A38"/>
            <stop offset="100%" stopColor="#6B2210"/>
          </linearGradient>
        </defs>
        {/* track */}
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="#E8E0D4" strokeWidth="14" strokeLinecap="round"/>
        {/* filled arc */}
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="url(#arcGrad)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}/>
        {/* needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#2B2218" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r="5" fill="#2B2218"/>
        {/* score */}
        <text x={cx} y={cy - 10} textAnchor="middle" fontSize="28" fontWeight="800"
          fill="#2B2218" fontFamily="Plus Jakarta Sans">{score}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#B0A89C"
          fontFamily="Plus Jakarta Sans" letterSpacing="1.5">VIRALITY SCORE</text>
      </svg>
      <span style={{
        marginTop: 4, padding: '5px 22px', borderRadius: 999,
        background: '#D9EDDA', color: '#2E6B30',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
      }}>HIGH PROBABILITY</span>
    </div>
  );
}

/* ─────────────── SHARED CARD ─────────────── */
const S = {
  card: {
    background: '#FAF9F6',
    borderRadius: 16,
    border: '1px solid #EAE4DC',
    boxShadow: '0 1px 6px rgba(43,34,24,0.05)',
    padding: '20px 20px',
    boxSizing: 'border-box',
  },
  tile: {
    background: '#F0EBE3',
    borderRadius: 12,
    padding: '13px 14px',
    boxSizing: 'border-box',
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 },
  moreBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#C0B8B0', padding: 2, display: 'flex' },
  hdr: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
};

const DotsBtn = () => (
  <button style={S.moreBtn}><MoreHorizontal size={16}/></button>
);

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dash-root">

      {/* ── HERO ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            {greeting}, <span style={{ color: '#C05A38' }}>Creator.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#7A7068', lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
            Your digital greenhouse is thriving. Viral potential is up 14% today across all core nodes.
          </p>
        </div>
        {/* STATUS chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#FAF9F6', borderRadius: 14, padding: '12px 18px',
          border: '1px solid #EAE4DC', boxShadow: '0 1px 6px rgba(43,34,24,0.05)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: '#D9EDDA',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
          }}>✦</div>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.12em', margin: '0 0 2px' }}>STATUS</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#2E6B30', margin: 0 }}>Optimal Growth</p>
          </div>
        </div>
      </div>

      {/* ══ ROW 1 ══ */}
      <div className="dash-grid" style={{ marginBottom: 16 }}>

        {/* ① Content Analytics */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Content Analytics</h2>
            <DotsBtn/>
          </div>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={barData} barSize={32} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#EAE4DC" vertical={false}/>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#B0A89C', fontFamily: 'Plus Jakarta Sans' }}
                axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip
                cursor={{ fill: 'rgba(192,90,56,0.05)', radius: 4 }}
                contentStyle={{ background: '#FAF7F2', border: '1px solid #DDD6CA', borderRadius: 10, fontSize: 12 }}
                formatter={(v) => [v, '']}/>
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {barData.map((d, i) => <Cell key={i} fill={d.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: '#B0A89C', marginTop: 10, fontStyle: 'italic' }}>
            Instagram performance is peaking at 18:00 EST.
          </p>
        </div>

        {/* ② Engagement Insights */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Engagement Insights</h2>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['#7A9A6E','ORGANIC'],['#C05A38','VIRAL']].map(([c,l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#7A7068', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block' }}/>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={engData} margin={{ top: 4, right: 0, bottom: -10, left: -32 }}>
              <defs>
                <linearGradient id="gOrg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7A9A6E" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#7A9A6E" stopOpacity={0.04}/>
                </linearGradient>
                <linearGradient id="gVir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C05A38" stopOpacity={0.45}/>
                  <stop offset="100%" stopColor="#C05A38" stopOpacity={0.03}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="t" hide/>
              <YAxis hide/>
              <Tooltip
                contentStyle={{ background: '#FAF7F2', border: '1px solid #DDD6CA', borderRadius: 10, fontSize: 12 }}
                formatter={(v, n) => [v.toLocaleString(), n === 'org' ? 'Organic' : 'Viral']}/>
              <Area type="monotone" dataKey="org" stroke="#7A9A6E" strokeWidth={2.5}
                fill="url(#gOrg)" fillOpacity={1}/>
              <Area type="monotone" dataKey="vir" stroke="#C05A38" strokeWidth={2.5}
                fill="url(#gVir)" fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ③ AI Recommendations */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>AI Recommendations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {aiRecs.map(({ emoji, body, hl, tail }, i) => (
              <div key={i} style={S.tile}>
                <div style={{ fontSize: 19, marginBottom: 8 }}>{emoji}</div>
                <p style={{ fontSize: 12, color: '#2B2218', lineHeight: 1.55, margin: 0 }}>
                  {body}<span style={{ fontWeight: 700, color: '#C05A38' }}>{hl}</span>{tail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ROW 2 ══ */}
      <div className="dash-grid">

        {/* ④ Social Platform Comparison */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Social Platform Comparison</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stats.map(({ label, val, Icon }) => (
              <div key={label} style={S.tile}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.1em' }}>{label}</span>
                  <Icon/>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#2B2218', letterSpacing: '-0.5px' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑤ Virality Prediction */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Virality Prediction</h2>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gauge score={87}/>
          </div>
        </div>

        {/* ⑥ Top Performers */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Top Performers</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {performers.map(({ name, score, pct }, i) => (
              <div key={name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7 }}>
                  {/* Dark avatar */}
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: `hsl(${[15, 200, 340][i]}, 30%, 28%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700,
                    overflow: 'hidden',
                  }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#2B2218' }}>{name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#C05A38' }}>{score}</span>
                </div>
                {/* Progress bar */}
                <div style={{ height: 4, borderRadius: 999, background: '#E8E0D4', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 999,
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #C05A38, #C9A96E)',
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .dash-root {
          padding: 32px 36px 48px;
          position: relative;
          z-index: 1;
          box-sizing: border-box;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .dash-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .dash-root { padding: 18px 14px 40px; }
          .dash-grid { grid-template-columns: 1fr; }
          h1 { font-size: 28px !important; }
        }
      `}</style>
    </div>
  );
}
