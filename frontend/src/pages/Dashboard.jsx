import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { MoreHorizontal, Zap, Users, Percent, FileText, TrendingUp, TrendingDown, BarChart2, Target, Lightbulb } from 'lucide-react';

/* ─────────────── DATA ─────────────── */
const engagementData = [
  { day: 'Mon', instagram: 4100, youtube: 2800, linkedin: 1200, twitter: 3100 },
  { day: 'Tue', instagram: 5100, youtube: 3200, linkedin: 1700, twitter: 2900 },
  { day: 'Wed', instagram: 3800, youtube: 4100, linkedin: 2200, twitter: 3400 },
  { day: 'Thu', instagram: 6200, youtube: 3800, linkedin: 1600, twitter: 4100 },
  { day: 'Fri', instagram: 7800, youtube: 5200, linkedin: 1300, twitter: 5200 },
  { day: 'Sat', instagram: 9100, youtube: 4600, linkedin: 900, twitter: 6100 },
  { day: 'Sun', instagram: 8300, youtube: 3900, linkedin: 800, twitter: 5800 },
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

const platformMetrics = [
  { name: 'Instagram', value: '54.2K', trend: '+14%', up: true, color: '#C05A38' },
  { name: 'Instagram', value: '54.2K', trend: '+14%', up: true, color: '#C05A38' },
  { name: 'Twitter', value: '30.6K', trend: '-2%', up: false, color: '#506B40' },
  { name: 'YouTube', value: '27.6K', trend: '+11%', up: true, color: '#A8442A' },
  { name: 'LinkedIn', value: '9.4K', trend: '+4%', up: true, color: '#C9A96E' },
];

const aiRecs = [
  { emoji: '🌱', body: 'Post carousels with ', hl: '#growth', tail: ' tagging.' },
  { emoji: '🌿', body: 'Update bio to include ', hl: 'CTA links', tail: '.' },
  { emoji: '🪴', body: 'Collaborate with ', hl: 'Top 3', tail: ' partners.' },
  { emoji: '🍃', body: 'A/B test ', hl: 'Linen', tail: ' color themes.' },
];

const topStats = [
  {
    title: 'Virality Score', sub: 'vs last week', val: '78', unit: '/100', trend: '+12%', up: true,
    Icon: Zap, color: '#C05A38', bgGlow: 'rgba(192,90,56,0.14)', iconBg: '#F3E5DF'
  },
  {
    title: 'Reach Potential', sub: 'this month', val: '2.4M', unit: '', trend: '+24%', up: true,
    Icon: Users, color: '#7A9A6E', bgGlow: 'rgba(122,154,110,0.12)', iconBg: '#E9EFEB'
  },
  {
    title: 'Avg Engagement Rate', sub: 'vs avg', val: '8.7', unit: '%', trend: '-2%', up: false,
    Icon: Percent, color: '#C9A96E', bgGlow: 'rgba(201,169,110,0.12)', iconBg: '#F7EFE4'
  },
  {
    title: 'Content Optimized', sub: 'this month', val: '47', unit: ' pieces', trend: '+8%', up: true,
    Icon: FileText, color: '#506B40', bgGlow: 'rgba(80,107,64,0.12)', iconBg: '#E4EBDF'
  }
];

const performers = [
  { name: 'Alex Rivera', score: '9.4k', pct: 94 },
  { name: 'Jordan Smith', score: '7.2k', pct: 72 },
  { name: 'Sarah Chen', score: '6.8k', pct: 68 },
];

/* ─────────────── GAUGE ─────────────── */
function Gauge({ score }) {
  const R = 76, cx = 100, cy = 100;
  const circ = Math.PI * R;
  const filled = (score / 100) * circ;
  const angleDeg = -180 + (score / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const nx = cx + R * Math.cos(angleRad);
  const ny = cy + R * Math.sin(angleRad);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '10px 0' }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A96E" />
            <stop offset="60%" stopColor="#C05A38" />
            <stop offset="100%" stopColor="#6B2210" />
          </linearGradient>
        </defs>
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="#E8E0D4" strokeWidth="14" strokeLinecap="round" />
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="url(#arcGrad)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`} />
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#2B2218" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill="#2B2218" />
        <text x={cx} y={cy - 10} textAnchor="middle" fontSize="32" fontWeight="800"
          fill="#2B2218" fontFamily="Plus Jakarta Sans" letterSpacing="-1px">{score}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#B0A89C"
          fontFamily="Plus Jakarta Sans" letterSpacing="1.5">VIRALITY</text>
      </svg>
      <span style={{
        marginTop: 4, padding: '6px 20px', borderRadius: 999,
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
    borderRadius: 20,
    border: '1px solid #EAE4DC',
    boxShadow: '0 4px 20px rgba(43,34,24,0.03)',
    padding: '24px',
    boxSizing: 'border-box',
    display: 'flex', flexDirection: 'column'
  },
  tile: {
    background: '#F0EBE3',
    borderRadius: 14,
    padding: '16px',
    boxSizing: 'border-box',
    border: 'none'
  },
  cardTitle: { fontSize: 17, fontWeight: 700, color: '#2B2218', margin: 0 },
  moreBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#B0A89C', padding: 2, display: 'flex' },
  hdr: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0, marginBottom: 20 },
};

const DotsBtn = () => (
  <button style={S.moreBtn}><MoreHorizontal size={16} /></button>
);

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dash-root">

      {/* ── HERO ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            {greeting}, <span style={{ color: '#C05A38' }}>Creator.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#7A7068', lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
            Your digital greenhouse is thriving. Viral potential is up 14% today across all core nodes.
          </p>
        </div>
        {/* STATUS chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#FAF9F6', borderRadius: 16, padding: '12px 16px',
          border: '1px solid #EAE4DC', boxShadow: '0 4px 20px rgba(43,34,24,0.03)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: '#D9EDDA',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E6B30',
          }}>
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.12em', margin: '0 0 2px' }}>STATUS</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#2E6B30', margin: 0 }}>Optimal Growth</p>
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL STATS ── */}
      <div className="top-stats" style={{ marginBottom: 16 }}>
        {topStats.map((st, i) => (
          <div key={i} style={{
            ...S.card,
            padding: '20px 24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
              background: `radial-gradient(circle at top right, ${st.bgGlow}, transparent 70%)`,
              pointerEvents: 'none',
              filter: 'blur(20px)'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{
                background: st.iconBg, borderRadius: 14, width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <st.Icon size={20} color={st.color} strokeWidth={2.5} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 12, fontWeight: 700,
                color: st.up ? '#2E6B30' : '#C05A38'
              }}>
                {st.up ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                {st.trend}
              </div>
            </div>

            <div style={{ zIndex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#2B2218', letterSpacing: '-0.5px' }}>{st.val}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7A7068' }}>{st.unit}</span>
              </div>
              <div style={{ fontSize: 13, color: '#7A7068', fontWeight: 600 }}>{st.title}</div>
              <div style={{ fontSize: 11, color: '#B0A89C', fontWeight: 500, marginTop: 4 }}>{st.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ══ ROW 1 ══ */}
      <div className="dash-grid" style={{ marginBottom: 16 }}>

        {/* ① Content Analytics -> 7-Day Engagement */}
        <div style={{ ...S.card, gridColumn: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: '#F3E5DF', padding: 8, borderRadius: 10, display: 'flex' }}>
                <BarChart2 size={20} color="#C05A38" strokeWidth={2.5} />
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#2B2218', margin: 0 }}>7-Day Engagement</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#B0A89C' }}>Total</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', letterSpacing: '-0.5px' }}>198.6K</div>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={engagementData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A7068', fontWeight: 600, fontFamily: 'Plus Jakarta Sans' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A7068', fontWeight: 600, fontFamily: 'Plus Jakarta Sans' }} tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}K`} />
                <Tooltip cursor={{ fill: 'rgba(43,34,24,0.02)' }} contentStyle={{ borderRadius: 8, border: '1px solid #EAE4DC', background: '#FAF9F6', boxShadow: '0 4px 12px rgba(43,34,24,0.05)', fontFamily: 'Plus Jakarta Sans' }} />
                <Bar dataKey="instagram" fill="#C05A38" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="linkedin" fill="#C9A96E" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="linkedin" fill="#C9A96E" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="twitter" fill="#506B40" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="youtube" fill="#A8442A" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, marginBottom: 24, fontSize: 13, fontWeight: 600, color: '#7A7068', flexWrap: 'wrap' }}>
            {[
              { name: 'instagram', color: '#C05A38' },
              { name: 'linkedin', color: '#C9A96E' },
              { name: 'linkedin', color: '#C9A96E' },
              { name: 'twitter', color: '#506B40' },
              { name: 'youtube', color: '#A8442A' },
            ].map(plat => (
              <div key={plat.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: plat.color }} />
                {plat.name}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Best Day', val: 'Sat' },
              { label: 'Top Platform', val: 'Instagram' },
              { label: 'Avg Daily', val: '28.4K' },
            ].map(box => (
              <div key={box.label} style={{ background: '#F0EBE3', padding: '12px 0', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#7A7068', fontWeight: 600, marginBottom: 4 }}>{box.label}</div>
                <div style={{ fontSize: 16, color: '#2B2218', fontWeight: 700 }}>{box.val}</div>
              </div>
            ))}
          </div>
        </div>



      </div>

      {/* ══ ROW 2 ══ */}
      <div className="dash-grid" style={{ marginBottom: 16 }}>
        {/* ③ Virality Prediction (layout from image, colors from theme) */}
        <div style={{ ...S.card, gridColumn: 'span 2' }}>
          <div style={S.hdr}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: '#E8E0D4', padding: 6, borderRadius: '50%' }}>
                <Target size={18} color="#C05A38" strokeWidth={2.5} />
              </div>
              <h2 style={S.cardTitle}>Virality Prediction</h2>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, background: '#D9EDDA', color: '#2E6B30', padding: '4px 12px', borderRadius: 999 }}>Live Analysis</span>
          </div>

          <div style={{ display: 'flex', gap: 24, marginBottom: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E8E0D4" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#C05A38" strokeWidth="8" strokeDasharray={`${0.78 * (2*Math.PI*42)} ${2*Math.PI*42}`} transform="rotate(-90 50 50)" strokeLinecap="round" />
                <text x="50" y="48" textAnchor="middle" fontSize="26" fontWeight="800" fill="#2B2218" fontFamily="Plus Jakarta Sans" letterSpacing="-1px">78</text>
                <text x="50" y="66" textAnchor="middle" fontSize="11" fill="#7A7068" fontFamily="Plus Jakarta Sans">/100</text>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#C05A38', margin: '8px 0 0' }}>High Reach</p>
            </div>
            
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) minmax(140px, 1fr)', gap: 12 }}>
              <div style={{ background: '#F0EBE3', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#7A7068', marginBottom: 4, fontWeight: 600 }}>Predicted Views</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#2B2218' }}>45.0K–120.0K</p>
              </div>
              <div style={{ background: '#F3E5DF', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#A8442A', marginBottom: 4, fontWeight: 600 }}>Est. Likes</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#C05A38' }}>2.2K–6.8K</p>
              </div>
              <div style={{ background: '#E9EFEB', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#506B40', marginBottom: 4, fontWeight: 600 }}>Est. Shares</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#7A9A6E' }}>380–1.2K</p>
              </div>
              <div style={{ background: '#F7EFE4', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#8A6D3B', marginBottom: 4, fontWeight: 600 }}>Comments</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#C9A96E' }}>150–480</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Hook Strength', val: 85, color: '#C05A38' },
              { label: 'Shareability', val: 72, color: '#7A9A6E' },
              { label: 'SEO Match', val: 68, color: '#C9A96E' },
              { label: 'Emotion Score', val: 88, color: '#A8442A' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: '#7A7068', fontWeight: 600 }}>
                  <span>{item.label}</span>
                  <span style={{ color: '#2B2218', fontWeight: 800 }}>{item.val}</span>
                </div>
                <div style={{ height: 6, width: '100%', background: '#E8E0D4', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.val}%`, background: item.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F0EBE3', borderRadius: 12, padding: '16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ color: '#C9A96E', flexShrink: 0 }}>
              <Lightbulb size={20} strokeWidth={2.5} />
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#7A7068' }}>
              <span style={{ fontWeight: 700, color: '#2B2218' }}>Add a stronger hook in the first 3 seconds</span> — use a surprising statistic
            </p>
          </div>
        </div>

        {/* ④ Top Performers */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Top Performers</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {performers.map(({ name, score, pct }, i) => (
              <div key={name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '12px', flexShrink: 0,
                    background: ['#E9EFEB', '#F7EFE4', '#E4EBDF'][i],
                    color: ['#7A9A6E', '#C9A96E', '#506B40'][i],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#2B2218' }}>{name}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#2B2218' }}>{score}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: '#E8E0D4', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 999,
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${['#C05A38', '#C9A96E', '#7A9A6E'][i]}, ${['#C9A96E', '#7A9A6E', '#506B40'][i]})`,
                  }} />
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
        .top-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) {
          .top-stats { grid-template-columns: repeat(2, 1fr); }
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
