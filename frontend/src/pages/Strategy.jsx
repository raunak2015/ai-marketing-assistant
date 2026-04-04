import { useState, useEffect } from 'react';
import { Zap, ExternalLink, MoreHorizontal } from 'lucide-react';
import api from '../services/api';

/* ── Heatmap data ── */
const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
const heatColor = v =>
  v >= 5 ? '#C05A38' : v >= 4 ? '#D47858' : v >= 3 ? '#C9A96E' : v >= 2 ? '#E8D4B8' : '#F0EBE3';

const defaultWeeklyPlan = [
  { action: 'Post "5 AI Tools That Saved Me 10hrs" Reel on Instagram', platform: 'Instagram', priority: 'High' },
  { action: 'Publish LinkedIn carousel on content strategy trends',     platform: 'LinkedIn',  priority: 'Medium' },
  { action: 'Repurpose top Reel as YouTube Short',                      platform: 'YouTube',   priority: 'Medium' },
  { action: 'Tweet thread on AI marketing insights (15 tweets)',        platform: 'Twitter',         priority: 'High' },
];

const defaultFormats = [
  { platform: 'Instagram', color: '#C05A38', format: '15–30s Reels',      reason: 'Algorithm currently prioritizes short video content' },
  { platform: 'YouTube',   color: '#506B40', format: 'YouTube Shorts',    reason: 'Shorts feed prioritized in Q2 2025'                 },
  { platform: 'LinkedIn',  color: '#C9A96E', format: 'Document Carousels',reason: '5.7× more reach than standard text posts'           },
  { platform: 'Twitter',   color: '#3A3028', format: 'Tweet Threads',     reason: 'Highest retweet rate of any Twitter format'               },
];

const formatColors = { 'Instagram': '#C05A38', 'YouTube': '#506B40', 'LinkedIn': '#C9A96E', 'Twitter': '#3A3028' };

const flowSteps = [
  { platform: 'Instagram', color: '#C05A38', action: 'Create on Instagram Reels', timing: 'Day 1' },
  { platform: 'YouTube',   color: '#506B40', action: 'Clip for YouTube Shorts',   timing: 'Day 2' },
  { platform: 'LinkedIn',  color: '#C9A96E', action: 'Post on LinkedIn',          timing: 'Day 3' },
];

const calDots = {
  3:['#C05A38'], 7:['#7A9A6E','#C05A38'], 10:['#C9A96E'],
  14:['#C05A38','#506B40'], 17:['#7A9A6E'], 21:['#C9A96E','#C05A38'],
  24:['#506B40'], 28:['#C05A38','#7A9A6E'],
};
const TODAY = 3;
const priorityStyle = {
  High:   { bg: '#FEF0EA', color: '#C05A38' },
  Medium: { bg: '#F0F4EE', color: '#7A9A6E' },
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FAF9F6', borderRadius: 16, border: '1px solid #EAE4DC',
    boxShadow: '0 1px 8px rgba(43,34,24,0.05)', padding: '22px',
    boxSizing: 'border-box', ...style,
  }}>{children}</div>
);

export default function Strategy() {
  const [platFilter, setPlatFilter] = useState('Instagram');
  const [tooltip, setTooltip]       = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(defaultWeeklyPlan);
  const [formats, setFormats]       = useState(defaultFormats);
  const [isGenerating, setIsGenerating] = useState(false);
  const [distributionFlow, setDistributionFlow] = useState(flowSteps);
  
  const heatData = {
    Mon: [1,2,2,3,4,4,5,4,2], Tue: [1,1,3,3,5,5,4,3,2],
    Wed: [2,3,4,4,4,5,5,3,1], Thu: [1,2,3,4,4,5,5,4,2],
    Fri: [2,2,3,4,5,5,5,4,3], Sat: [2,3,3,4,4,5,5,5,4],
    Sun: [3,3,4,4,4,4,5,5,3],
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await api.generateStrategy({ 
        niche: 'Digital Marketing', 
        goals: 'Viral growth', 
        platforms: ['Instagram', 'YouTube', 'LinkedIn'] 
      });
      if (res.success && res.data) {
        setWeeklyPlan(res.data.weeklyPlan || []);
        if (Array.isArray(res.data.distributionFlow)) {
          setDistributionFlow(res.data.distributionFlow.map(step => ({
            ...step,
            color: formatColors[step.platform] || '#C05A38'
          })));
        }
        if (Array.isArray(res.data.formatRecommendations)) {
          setFormats(res.data.formatRecommendations.map(f => ({
            ...f,
            color: formatColors[f.platform] || '#C05A38'
          })));
        }
      }
    } catch (err) {
      console.error('Failed to generate strategy:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // Initial data fetch if needed
    api.getFormatRecommendations().then(res => {
      if (res.success && res.data && Array.isArray(res.data)) {
        setFormats(res.data.map(f => ({
          ...f,
          color: formatColors[f.platform] || '#C05A38',
        })));
      }
    }).catch(() => {});
  }, []);

  const pill = (active) => ({
    padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
    background: active ? '#C05A38' : '#F0EBE3', color: active ? '#fff' : '#7A7068',
    border: 'none', fontSize: 13, fontWeight: active ? 600 : 400, transition: 'all 150ms',
  });

  return (
    <div className="st-root">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.8px' }}>Archive & Strategy</h1>
          <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>Plan, schedule, and distribute your content across every platform.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{
            padding: '10px 20px', borderRadius: 999,
            background: isGenerating ? '#DDD6CA' : '#C05A38', color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'background 150ms',
          }}
          onMouseEnter={e => { if (!isGenerating) e.currentTarget.style.background = '#A8442A'; }}
          onMouseLeave={e => { if (!isGenerating) e.currentTarget.style.background = '#C05A38'; }}>
          <Zap size={15} className={isGenerating ? 'animate-pulse' : ''}/> 
          {isGenerating ? 'Plan Generating...' : 'Generate Weekly Plan'}
        </button>
      </div>

      {/* ── ROW 1: Heatmap + Weekly Plan ── */}
      <div className="st-r1" style={{ marginBottom: 18 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Best Posting Windows</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Instagram','YouTube','LinkedIn','Twitter'].map(p => (
                <button key={p} style={pill(platFilter === p)} onClick={() => setPlatFilter(p)}>{p} Plan</button>
              ))}
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 11 }}>
              <thead>
                <tr>
                  <th style={{ width: 36, textAlign: 'left', paddingBottom: 10, color: '#B0A89C', fontWeight: 500 }}/>
                  {HOURS.map(h => <th key={h} style={{ paddingBottom: 10, color: '#B0A89C', fontWeight: 500, textAlign: 'center', minWidth: 38 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {DAYS.map(d => (
                  <tr key={d}>
                    <td style={{ paddingRight: 10, color: '#7A7068', fontWeight: 600, paddingBottom: 4, whiteSpace: 'nowrap' }}>{d}</td>
                    {heatData[d].map((v, i) => (
                      <td key={i} style={{ padding: '2px 3px', position: 'relative' }}>
                        <div
                          title={`${d} ${HOURS[i]}`}
                          style={{ width: 32, height: 26, borderRadius: 6, background: heatColor(v), cursor: 'pointer', transition: 'opacity 150ms' }}
                          onMouseEnter={() => setTooltip({ day: d, hour: HOURS[i], val: v })}
                          onMouseLeave={() => setTooltip(null)}
                        />
                        {tooltip?.day === d && tooltip?.hour === HOURS[i] && (
                          <div style={{
                            position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                            background: '#2B2218', color: '#fff', borderRadius: 8,
                            padding: '6px 10px', fontSize: 11, fontWeight: 600,
                            whiteSpace: 'nowrap', zIndex: 50, pointerEvents: 'none',
                          }}>
                            {d} {HOURS[i]} · Eng: {(v * 1.5).toFixed(1)}%
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
              <span style={{ fontSize: 11, color: '#B0A89C' }}>Low</span>
              {['#F0EBE3','#E8D4B8','#C9A96E','#D47858','#C05A38'].map(c => (
                <div key={c} style={{ width: 20, height: 10, borderRadius: 3, background: c }}/>
              ))}
              <span style={{ fontSize: 11, color: '#B0A89C' }}>High</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 18px' }}>This Week's AI Growth Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {weeklyPlan.map((item, i) => (
              <div key={i} style={{ paddingBottom: i < weeklyPlan.length - 1 ? 14 : 0, borderBottom: i < weeklyPlan.length - 1 ? '1px solid #F0EBE3' : 'none', marginBottom: i < weeklyPlan.length - 1 ? 14 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#C05A38', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12.5, color: '#2B2218', margin: '0 0 7px', lineHeight: 1.5 }}>{item.action}</p>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, background: '#F0EBE3', color: '#7A7068', fontWeight: 500 }}>{item.platform}</span>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, background: priorityStyle[item.priority]?.bg || '#F0F4EE', color: priorityStyle[item.priority]?.color || '#7A9A6E', fontWeight: 700 }}>{item.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 18, width: '100%', padding: '12px', borderRadius: 999,
            background: '#C05A38', color: '#fff', border: 'none', fontSize: 13,
            fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Zap size={14}/> {isGenerating ? 'Analyzing...' : 'Execute Growth Plan'}
          </button>
        </Card>
      </div>

      {/* ── ROW 2: Formats + Calendar + Distribution ── */}
      <div className="st-r2">
        <Card>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 18px' }}>Format Recommendations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {formats.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: f.color, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.platform ? f.platform[0] : '?'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#2B2218', margin: '0 0 2px' }}>{f.format}</p>
                  <p style={{ fontSize: 11.5, color: '#7A7068', margin: 0, lineHeight: 1.45 }}>{f.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Content Calendar</h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B0A89C' }}><MoreHorizontal size={16}/></button>
          </div>
          <p style={{ fontSize: 12, color: '#B0A89C', fontWeight: 600, textAlign: 'center', margin: '0 0 10px' }}>April 2026</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#B0A89C', textAlign: 'center' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            <div/><div/>
            {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
              <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: d === TODAY ? 700 : 400, cursor: 'pointer',
                  background: d === TODAY ? '#C05A38' : 'transparent',
                  color: d === TODAY ? '#fff' : '#2B2218',
                }}>
                  {d}
                </div>
                {calDots[d] && (
                  <div style={{ display: 'flex', gap: 3 }}>
                    {calDots[d].map((c, i) => (
                      <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }}/>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: '0 0 18px' }}>Distribution Strategy</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {distributionFlow.map((step, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: step.color, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {step.platform ? step.platform[0] : '?'}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#2B2218', margin: '0 0 2px' }}>{step.action}</p>
                    <p style={{ fontSize: 11, color: '#7A7068', margin: 0 }}>{step.timing}</p>
                  </div>
                </div>
                {i < distributionFlow.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 6px 16px' }}>
                    <div style={{ width: 1, height: 20, borderLeft: '2px dashed #C05A38', opacity: 0.4 }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <style>{`
        .st-root { padding: 32px 36px 48px; position: relative; z-index: 1; box-sizing: border-box; }
        .st-r1   { display: grid; grid-template-columns: 1.5fr 1fr; gap: 18px; align-items: start; }
        .st-r2   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 1024px) {
          .st-r1 { grid-template-columns: 1fr; }
          .st-r2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .st-root { padding: 18px 14px 40px; }
          .st-r2 { grid-template-columns: 1fr; }
          h1 { font-size: 24px !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
