import { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Video, Hash, MessageSquareText, Image as ImageIcon, Send } from 'lucide-react';

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X'];
const GOALS = ['Engagement', 'Conversion', 'Education', 'Viral Reach', 'Brand Awareness'];

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#FAF9F6', borderRadius: 16, border: '1px solid #EAE4DC',
    boxShadow: '0 1px 8px rgba(43,34,24,0.05)', padding: '22px',
    boxSizing: 'border-box', ...style,
  }}>{children}</div>
);

const pill = (active, accent = '#C05A38') => ({
  padding: '7px 15px', borderRadius: 999,
  background: active ? accent : '#F0EBE3',
  color: active ? '#fff' : '#7A7068',
  border: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
  flexShrink: 0,
});

export default function ContentStudio() {
  const [platform, setPlatform] = useState('Instagram');
  const [goal, setGoal]         = useState('Viral Reach');
  const [topic, setTopic]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [output, setOutput]     = useState(null);
  const [copied, setCopied]     = useState(null);

  const generate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setOutput({
        hooks: [
          'The one secret to viral growth nobody tells you… 🤫',
          'Stop scrolling! This 2025 workflow will change everything.',
          'I tried 50 strategies. Only this one worked.',
        ],
        captions: [
          `Building the future of marketing with AI. It's not just about the tools — it's about the strategy. 🚀\n\n#ViralPulse #MarketingTips #AI`,
          'Your content deserves to be seen. Let\'s make it happen. ✨',
        ],
        hashtags: ['#CreatorEconomy', '#ViralGrowth', '#AIMarketing', '#ContentStrategy', '#GrowthHacking'],
      });
      setLoading(false);
    }, 1400);
  };

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="cs-root">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#2B2218', margin: '0 0 6px', letterSpacing: '-0.8px' }}>
            GrowthMaps Studio
          </h1>
          <p style={{ fontSize: 14, color: '#7A7068', margin: 0 }}>AI-powered hooks, captions and hashtags optimised for your platform.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ ...pill(false), padding: '8px 18px' }}>Drafts</button>
          <button style={{ ...pill(false), padding: '8px 18px' }}>Templates</button>
        </div>
      </div>

      {/* 2-col layout */}
      <div className="cs-grid">
        {/* ── LEFT control panel ── */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Platform */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 12px' }}>PLATFORM</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PLATFORMS.map(p => <button key={p} style={pill(platform === p)} onClick={() => setPlatform(p)}>{p}</button>)}
            </div>
          </div>

          {/* Goal */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 12px' }}>GOAL</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GOALS.map(g => <button key={g} style={pill(goal === g, '#C9A96E')} onClick={() => setGoal(g)}>{g}</button>)}
            </div>
          </div>

          {/* Topic */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 12px' }}>TOPIC OR DESCRIPTION</p>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="What is your content about? Describe your idea, hook, or reel concept…"
              rows={7}
              style={{
                width: '100%', borderRadius: 12, border: '1.5px solid #E8E0D4',
                background: '#F5F2EE', padding: '14px', fontSize: 13, color: '#2B2218',
                resize: 'none', outline: 'none', fontFamily: 'inherit',
                lineHeight: 1.6, boxSizing: 'border-box', transition: 'border 150ms',
              }}
              onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
              onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
            />
          </div>

          {/* CTA */}
          <button onClick={generate} disabled={loading || !topic.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: 999,
              background: loading || !topic.trim() ? '#B0A89C' : '#C05A38',
              color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
              cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'background 150ms',
            }}>
            {loading
              ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }}/> Generating…</>
              : <><Sparkles size={16}/> Optimize Content</>
            }
          </button>
        </Card>

        {/* ── RIGHT output ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {output ? (
            <>
              {/* Viral Hooks */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Video size={16} style={{ color: '#C05A38' }}/>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Viral Hooks</h2>
                  </div>
                  <button onClick={generate} style={{ fontSize: 12, fontWeight: 600, color: '#C05A38', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    ↺ Regenerate
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {output.hooks.map((hook, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                      background: '#F5F2EE', borderRadius: 12, padding: '14px', cursor: 'pointer', transition: 'background 150ms',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#EDE8DF'}
                      onMouseLeave={e => e.currentTarget.style.background = '#F5F2EE'}>
                      <p style={{ fontSize: 13, color: '#2B2218', margin: 0, lineHeight: 1.6, flex: 1 }}>{hook}</p>
                      <button onClick={() => copy(hook, `hook-${i}`)}
                        style={{ background: '#fff', border: '1px solid #E8E0D4', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', flexShrink: 0 }}>
                        <Copy size={13} style={{ color: copied === `hook-${i}` ? '#7A9A6E' : '#7A7068' }}/>
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Captions */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <MessageSquareText size={16} style={{ color: '#C9A96E' }}/>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Optimized Captions</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {output.captions.map((cap, i) => (
                    <div key={i} style={{ position: 'relative', background: '#F5F2EE', borderRadius: 12, padding: '14px' }}>
                      <p style={{ fontSize: 13, color: '#2B2218', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap', paddingRight: 36 }}>{cap}</p>
                      <button onClick={() => copy(cap, `cap-${i}`)}
                        style={{ position: 'absolute', top: 12, right: 12, background: '#fff', border: '1px solid #E8E0D4', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}>
                        <Copy size={13} style={{ color: copied === `cap-${i}` ? '#7A9A6E' : '#7A7068' }}/>
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Hashtags */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <Hash size={16} style={{ color: '#7A9A6E' }}/>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Trending Hashtags</h2>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {output.hashtags.map((tag, i) => (
                    <span key={i} onClick={() => copy(tag, `tag-${i}`)}
                      style={{
                        padding: '7px 14px', borderRadius: 999, fontSize: 13,
                        background: copied === `tag-${i}` ? '#C05A38' : '#F0EBE3',
                        color: copied === `tag-${i}` ? '#fff' : '#2B2218',
                        cursor: 'pointer', transition: 'all 150ms', fontWeight: 500,
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <div style={{
              minHeight: 440, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              border: '1.5px dashed #D0C8BE', borderRadius: 16, padding: '40px 32px',
              background: '#FAF9F6',
            }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#F0EBE3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Sparkles size={28} style={{ color: '#C05A38' }}/>
              </div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#2B2218', margin: '0 0 10px' }}>Generate Your Viral Content</h2>
              <p style={{ fontSize: 14, color: '#7A7068', lineHeight: 1.6, margin: 0, maxWidth: 340 }}>
                Fill in the platform, goal, and topic on the left — our AI will generate optimized hooks, captions, and hashtags instantly.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .cs-root { padding: 32px 36px 48px; position: relative; z-index: 1; box-sizing: border-box; }
        .cs-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 18px; align-items: start; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 860px) { .cs-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .cs-root { padding: 18px 14px 40px; } h1 { font-size: 24px !important; } }
      `}</style>
    </div>
  );
}
