import { useEffect, useState } from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { MoreHorizontal, Zap, Users, Percent, FileText, TrendingUp, TrendingDown, BarChart2, Target, Lightbulb } from 'lucide-react';
import { getUserInitials } from '../utils/userDataGenerator';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

const IconMap = { Zap, Users, Percent, FileText };

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userStr = localStorage.getItem('viralPulseUser');
        const token = localStorage.getItem('viralPulseToken');
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setUserData(result.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dash-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: '#7A7068' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="dash-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: '#7A7068' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Please login to view your dashboard</div>
        </div>
      </div>
    );
  }

  const { greeting: userGreeting, status, topStats, engagementData, totalEngagement, platformMetrics, viralityPrediction, insights, performers, aiRecs, hookTip } = userData;

  return (
    <div className="dash-root">

      {/* ── HERO ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            {greeting}, <span style={{ color: '#C05A38' }}>{userGreeting}.</span>
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
            <p style={{ fontSize: 13, fontWeight: 700, color: '#2E6B30', margin: 0 }}>{status}</p>
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL STATS ── */}
      <div className="top-stats" style={{ marginBottom: 16 }}>
        {topStats.map((st, i) => {
          const IconComponent = IconMap[st.Icon];
          return (
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
                  {IconComponent && <IconComponent size={20} color={st.color} strokeWidth={2.5} />}
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
          );
        })}
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
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2B2218', letterSpacing: '-0.5px' }}>{totalEngagement}K</div>
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
                <Bar dataKey="twitter" fill="#506B40" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="youtube" fill="#A8442A" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, marginBottom: 24, fontSize: 13, fontWeight: 600, color: '#7A7068', flexWrap: 'wrap' }}>
            {[
              { name: 'Instagram', color: '#C05A38' },
              { name: 'LinkedIn', color: '#C9A96E' },
              { name: 'Twitter', color: '#506B40' },
              { name: 'YouTube', color: '#A8442A' },
            ].map(plat => (
              <div key={plat.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: plat.color }} />
                {plat.name}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Best Day', val: insights.bestDay },
              { label: 'Top Platform', val: insights.topPlatform },
              { label: 'Avg Daily', val: insights.avgDaily },
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
        {/* ③ Virality Prediction */}
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
                <circle cx="50" cy="50" r="42" fill="none" stroke="#C05A38" strokeWidth="8" strokeDasharray={`${(viralityPrediction.score / 100) * (2 * Math.PI * 42)} ${2 * Math.PI * 42}`} transform="rotate(-90 50 50)" strokeLinecap="round" />
                <text x="50" y="48" textAnchor="middle" fontSize="26" fontWeight="800" fill="#2B2218" fontFamily="Plus Jakarta Sans" letterSpacing="-1px">{viralityPrediction.score}</text>
                <text x="50" y="66" textAnchor="middle" fontSize="11" fill="#7A7068" fontFamily="Plus Jakarta Sans">/100</text>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#C05A38', margin: '8px 0 0' }}>{viralityPrediction.label} Reach</p>
            </div>
            
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) minmax(140px, 1fr)', gap: 12 }}>
              <div style={{ background: '#F0EBE3', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#7A7068', marginBottom: 4, fontWeight: 600 }}>Predicted Views</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#2B2218' }}>{viralityPrediction.predictedViews}</p>
              </div>
              <div style={{ background: '#F3E5DF', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#A8442A', marginBottom: 4, fontWeight: 600 }}>Est. Likes</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#C05A38' }}>{viralityPrediction.estLikes}</p>
              </div>
              <div style={{ background: '#E9EFEB', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#506B40', marginBottom: 4, fontWeight: 600 }}>Est. Shares</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#7A9A6E' }}>{viralityPrediction.estShares}</p>
              </div>
              <div style={{ background: '#F7EFE4', padding: '14px 16px', borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: '#8A6D3B', marginBottom: 4, fontWeight: 600 }}>Comments</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#C9A96E' }}>{viralityPrediction.comments}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {viralityPrediction.metrics.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: '#7A7068', fontWeight: 600 }}>
                  <span>{item.label}</span>
                  <span style={{ color: '#2B2218', fontWeight: 800 }}>{item.val}</span>
                </div>
                <div style={{ height: 6, width: '100%', background: '#E8E0D4', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.val}%`, background: ['#C05A38', '#7A9A6E', '#C9A96E', '#A8442A'][i], borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F0EBE3', borderRadius: 12, padding: '16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ color: '#C9A96E', flexShrink: 0 }}>
              <Lightbulb size={20} strokeWidth={2.5} />
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#7A7068' }}>
              <span style={{ fontWeight: 700, color: '#2B2218' }}>{hookTip}</span>
            </p>
          </div>
        </div>

        {/* ④ Top Performers */}
        <div style={S.card}>
          <div style={S.hdr}>
            <h2 style={S.cardTitle}>Top Performers</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {performers.map(({ name, score, pct, platform, color, bgColor }, i) => (
              <div key={platform || name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '12px', flexShrink: 0,
                    background: bgColor || ['#E9EFEB', '#F7EFE4', '#E4EBDF'][i % 3],
                    color: color || ['#7A9A6E', '#C9A96E', '#506B40'][i % 3],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#2B2218' }}>{name}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#2B2218' }}>{score}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: '#E8E0D4', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 999,
                    width: `${pct}%`,
                    background: color || '#C05A38',
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
          h1 { fontSize: 28px !important; }
        }
      `}</style>
    </div>
  );
}
