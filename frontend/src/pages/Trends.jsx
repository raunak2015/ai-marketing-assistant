import { useState, useRef } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, Leaf } from 'lucide-react';

/* ─── Gauge (same as dashboard) ─── */
function Gauge({ score }) {
  const R = 70, cx = 110, cy = 110;
  const circ = Math.PI * R;
  const filled = (score / 100) * circ;
  const angleDeg = -180 + (score / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const nx = cx + R * Math.cos(angleRad);
  const ny = cy + R * Math.sin(angleRad);
  return (
    <svg width="220" height="130" viewBox="0 0 220 130" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="gArc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#C9A96E"/>
          <stop offset="55%"  stopColor="#C05A38"/>
          <stop offset="100%" stopColor="#6B1E0A"/>
        </linearGradient>
      </defs>
      {/* track */}
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
        fill="none" stroke="#E8E0D4" strokeWidth="16" strokeLinecap="round"/>
      {/* filled */}
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
        fill="none" stroke="url(#gArc)" strokeWidth="16" strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}/>
      {/* needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#2B2218" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="5" fill="#2B2218"/>
      {/* score */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="36" fontWeight="900"
        fill="#2B2218" fontFamily="Plus Jakarta Sans">{score}</text>
    </svg>
  );
}

/* ─── Mini bar chart for reach/impressions cards ─── */
const miniData = [
  { v: 55 }, { v: 70 }, { v: 60 }, { v: 80 }, { v: 75 }, { v: 95 }, { v: 88 },
];
const miniColors = ['#DDD6CA','#DDD6CA','#C9A96E','#C05A38','#C05A38','#C05A38','#C05A38'];

/* ─── Suggestion priority badge ─── */
const PriorityBadge = ({ level }) => {
  const map = {
    'HIGH IMPACT': { bg: '#FEF0EA', color: '#C05A38', border: '#F5C5A8' },
    'MEDIUM':      { bg: '#F0F4EE', color: '#7A9A6E', border: '#BDD4B4' },
    'LOW':         { bg: '#F5F3F0', color: '#B0A89C', border: '#DDD6CA' },
  };
  const s = map[level] || map['LOW'];
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: '0.06em', flexShrink: 0,
    }}>{level}</span>
  );
};

/* ─── Shared card ─── */
const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FAF9F6', borderRadius: 16,
    border: '1px solid #EAE4DC',
    boxShadow: '0 1px 8px rgba(43,34,24,0.05)',
    padding: '22px 22px',
    boxSizing: 'border-box',
    ...style,
  }}>{children}</div>
);

/* ─── Platform pills data ─── */
const PLATFORMS = ['Instagram','YouTube','LinkedIn','Twitter'];
const CONTENT_TYPES = ['Caption','Reel/Short','Thumbnail','Post Idea','Script'];

const suggestions = [
  { text: 'Add a curiosity gap in the first 3 seconds of the caption.', level: 'HIGH IMPACT' },
  { text: 'Leverage trending audio #LohGarden vibes for background.', level: 'MEDIUM' },
  { text: 'Optimize CTA: Ask a binary question (Yes/No) to boost comments.', level: 'HIGH IMPACT' },
  { text: 'Use warmer lighting in the thumbnail preview (Terracotta tint).', level: 'LOW' },
];

/* ──────────────────────────────────────── */
export default function Campaigns() {
  const [activePlatform, setActivePlatform] = useState('Instagram');
  const [activeType, setActiveType] = useState('Caption');
  const [content, setContent] = useState('');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const MAX = 2000;

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setUploading(true);
    setTimeout(() => setUploading(false), 1200);
  };

  /* Pill button style */
  const pill = (active) => ({
    padding: '7px 16px', borderRadius: 999,
    background: active ? '#C05A38' : '#F0EBE3',
    color: active ? '#fff' : '#7A7068',
    border: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
  });

  return (
    <div className="vps-root">

      {/* ── PAGE HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.8px', lineHeight: 1.15 }}>
            Viral Prediction Studio
          </h1>
          <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>
            Predicting the future of your digital growth through artificial intelligence.
          </p>
        </div>
        <button style={{
          padding: '10px 20px', borderRadius: 999,
          border: '1.5px solid #DDD6CA', background: '#FAF9F6',
          fontSize: 13, fontWeight: 600, color: '#2B2218',
          cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
          transition: 'background 150ms',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#F0EBE3'}
          onMouseLeave={e => e.currentTarget.style.background = '#FAF9F6'}>
          How It Works
        </button>
      </div>

      {/* ── MAIN 2-COL GRID ── */}
      <div className="vps-grid" style={{ marginBottom: 18 }}>

        {/* ════ LEFT — Input Panel ════ */}
        <Card>
          {/* YOUR CONTENT label */}
          <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 14px' }}>YOUR CONTENT</p>

          {/* Platform pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {PLATFORMS.map(p => (
              <button key={p} style={pill(activePlatform === p)} onClick={() => setActivePlatform(p)}>{p}</button>
            ))}
          </div>

          {/* Content type pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {CONTENT_TYPES.map(t => (
              <button key={t} style={pill(activeType === t)} onClick={() => setActiveType(t)}>{t}</button>
            ))}
          </div>

          {/* Textarea */}
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value.slice(0, MAX))}
              placeholder="Paste your caption, describe your reel idea, or drop your script here..."
              rows={6}
              style={{
                width: '100%', borderRadius: 12, border: '1.5px solid #E8E0D4',
                background: '#F5F2EE', padding: '14px', fontSize: 13, color: '#2B2218',
                resize: 'none', outline: 'none', fontFamily: 'inherit',
                lineHeight: 1.6, boxSizing: 'border-box', transition: 'border 150ms',
              }}
              onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
              onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
            />
            <span style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 11, color: '#B0A89C' }}>
              {content.length}/{MAX}
            </span>
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            style={{
              border: `1.5px dashed ${dragging ? '#C05A38' : '#D0C8BE'}`,
              borderRadius: 12, padding: '26px 16px', textAlign: 'center',
              cursor: 'pointer', marginBottom: 18, transition: 'all 150ms',
              background: dragging ? '#FEF0EA' : 'transparent',
            }}>
            <input ref={fileRef} type="file" style={{ display: 'none' }} accept="image/*,video/*"/>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: '#FEF0EA', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C05A38" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
            </div>
            <p style={{ fontSize: 13, color: '#7A7068', margin: '0 0 4px', fontWeight: 500 }}>
              {uploading ? 'Uploading…' : 'Drop thumbnail or media here'}
            </p>
            <p style={{ fontSize: 10, color: '#B0A89C', margin: 0, letterSpacing: '0.06em', fontWeight: 600 }}>
              MAXIMUM FILE SIZE: 10MB
            </p>
          </div>

          {/* CTA */}
          <button style={{
            width: '100%', padding: '15px', borderRadius: 999,
            background: '#C05A38', color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8, transition: 'background 150ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#A8442A'}
            onMouseLeave={e => e.currentTarget.style.background = '#C05A38'}>
            ✦ Analyze Virality
          </button>
        </Card>

        {/* ════ RIGHT — Results ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ① Virality Score card */}
          <Card style={{ textAlign: 'center' }}>
            <Gauge score={87}/>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#C05A38', letterSpacing: '0.12em', margin: '4px 0 18px' }}>
              HIGH VIRAL POTENTIAL
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['SHAREABILITY','92'],['ENGAGEMENT','78'],['TREND MATCH','88']].map(([l,v]) => (
                <div key={l} style={{
                  flex: 1, background: '#F5F2EE', borderRadius: 10, padding: '10px 6px',
                }}>
                  <p style={{ fontSize: 9, color: '#B0A89C', fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 4px' }}>{l}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#C05A38', margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* ② AI Optimization Suggestions */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#7A9A6E', display: 'inline-block', flexShrink: 0 }}/>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#2B2218', margin: 0 }}>AI Optimization Suggestions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {suggestions.map(({ text, level }, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #F0EBE3' : 'none',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>🌿</span>
                  <p style={{ flex: 1, fontSize: 12.5, color: '#2B2218', margin: 0, lineHeight: 1.5 }}>{text}</p>
                  <PriorityBadge level={level}/>
                </div>
              ))}
            </div>
          </Card>

          {/* ③ Mini stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'ESTIMATED REACH', value: '245K' },
              { label: 'IMPRESSIONS',     value: '1.2M' },
            ].map(({ label, value }) => (
              <Card key={label} style={{ padding: '16px 16px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#B0A89C', letterSpacing: '0.12em', margin: 0 }}>{label}</p>
                  <ArrowUpRight size={14} style={{ color: '#C05A38', flexShrink: 0 }}/>
                </div>
                <p style={{ fontSize: 24, fontWeight: 900, color: '#2B2218', margin: '0 0 10px', letterSpacing: '-0.5px' }}>{value}</p>
                <ResponsiveContainer width="100%" height={38}>
                  <BarChart data={miniData} barSize={10} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                    <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                      {miniData.map((_, i) => <Cell key={i} fill={miniColors[i]}/>)}
                    </Bar>
                    <Tooltip
                      cursor={false}
                      contentStyle={{ display: 'none' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ════ BOTTOM ROW ════ */}
      <div className="vps-bottom">

        {/* Live Industry Pulse */}
        <div style={{
          background: '#FAF9F6', borderRadius: 16,
          border: '1px solid #EAE4DC',
          overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          minHeight: 260,
        }}>
          {/* background botanical image overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(240,235,227,0), rgba(212,195,170,0.18))',
            pointerEvents: 'none',
          }}/>
          {/* Botanical art in right portion */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '38%',
            background: 'linear-gradient(135deg, #BFB5A4 0%, #9A8C7A 40%, #7A6E5E 100%)',
            opacity: 0.35, borderRadius: '0 16px 16px 0',
          }}/>
          <div style={{ position: 'relative', zIndex: 1, padding: '28px 28px' }}>
            <span style={{
              fontSize: 9, fontWeight: 800, color: '#7A9A6E', letterSpacing: '0.16em',
              display: 'block', marginBottom: 12,
            }}>🔴 LIVE INDUSTRY PULSE</span>
            <h2 style={{
              fontSize: 22, fontWeight: 900, color: '#2B2218',
              margin: '0 0 12px', lineHeight: 1.25, letterSpacing: '-0.3px', maxWidth: 320,
            }}>
              Organic growth trends are shifting toward short-form storytelling.
            </h2>
            <p style={{ fontSize: 13, color: '#7A7068', lineHeight: 1.6, margin: '0 0 20px', maxWidth: 340 }}>
              Our AI detected a 12% increase in retention for videos featuring botanical or natural background elements this week.
            </p>
            <button style={{
              padding: '10px 20px', borderRadius: 999,
              background: '#2B2218', color: '#fff',
              border: 'none', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'background 150ms',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1A1410'}
              onMouseLeave={e => e.currentTarget.style.background = '#2B2218'}>
              View Full Report →
            </button>
          </div>
        </div>

        {/* Ready to launch */}
        <div style={{
          background: 'linear-gradient(145deg, #7B2A14 0%, #A03820 60%, #C05A38 100%)',
          borderRadius: 16, padding: '28px 26px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 260,
        }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              Ready to launch?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
              Sync your accounts to automate scheduling based on predicted peak virality times.
            </p>
          </div>
          {/* Best time card */}
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 12, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12, marginTop: 24,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#fff', flexShrink: 0,
            }}/>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.1em', margin: '0 0 2px' }}>
                Best Time to Post
              </p>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0 }}>
                6:14 PM Tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Responsive CSS ─── */}
      <style>{`
        .vps-root {
          padding: 32px 36px 48px;
          position: relative; z-index: 1; box-sizing: border-box;
        }
        .vps-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 18px;
          align-items: start;
        }
        .vps-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 900px) {
          .vps-grid { grid-template-columns: 1fr; }
          .vps-bottom { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .vps-root { padding: 18px 14px 40px; }
          h1 { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
}
