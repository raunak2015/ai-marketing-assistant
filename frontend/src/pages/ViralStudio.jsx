import { useState } from 'react';
import { Leaf, Upload, Sparkles, ArrowUp } from 'lucide-react';

const platforms = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X'];
const contentTypes = ['Caption', 'Reel/Short', 'Thumbnail', 'Post Idea', 'Script'];
const suggestions = [
  { text: 'Add a compelling hook in the first 3 seconds to boost watch time.', impact: 'High Impact' },
  { text: 'Include a clear call-to-action like "Save this for later" or "Share with a creator friend".', impact: 'High Impact' },
  { text: 'Use 3–5 niche hashtags alongside 2 broad ones for maximum discoverability.', impact: 'Medium' },
  { text: 'Post between 6–8PM on weekdays for your target demographic.', impact: 'High Impact' },
  { text: 'Add captions — 85% of videos are watched without sound.', impact: 'Low' },
];

const impactColor = { 'High Impact': '#C05A38', 'Medium': '#C9A96E', 'Low': '#7A9A6E' };

function GaugeChart({ score }) {
  const circumference = Math.PI * 80;
  const progress = (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A96E"/><stop offset="50%" stopColor="#C05A38"/><stop offset="100%" stopColor="#6B2A14"/>
          </linearGradient>
        </defs>
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="#E8E0D4" strokeWidth="14" strokeLinecap="round"/>
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="url(#sg)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}/>
        <text x="100" y="90" textAnchor="middle" fontSize="36" fontWeight="700" fill="#2B2218" fontFamily="Plus Jakarta Sans">{score}</text>
      </svg>
    </div>
  );
}

export default function ViralStudio() {
  const [platform, setPlatform] = useState('Instagram');
  const [contentType, setContentType] = useState('Caption');
  const [text, setText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => { if (text.trim()) setAnalyzed(true); };

  return (
    <div className="px-4 md:px-8 py-6 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#2B2218' }}>Viral Prediction Studio</h1>
        <button className="btn-ghost text-sm">How It Works</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left — Input */}
        <div className="card space-y-5">
          <h3 className="text-base font-semibold" style={{ color: '#2B2218' }}>Your Content</h3>

          <div>
            <p className="text-xs font-medium mb-2" style={{ color: '#7A7068' }}>Platform</p>
            <div className="flex gap-2 flex-wrap">
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className="pill text-xs font-medium transition-all"
                  style={{ background: platform === p ? '#C05A38' : '#E8E0D4', color: platform === p ? 'white' : '#7A7068', padding: '6px 14px' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium mb-2" style={{ color: '#7A7068' }}>Content Type</p>
            <div className="flex gap-2 flex-wrap">
              {contentTypes.map(t => (
                <button key={t} onClick={() => setContentType(t)}
                  className="pill text-xs font-medium transition-all"
                  style={{ background: contentType === t ? '#C05A38' : '#E8E0D4', color: contentType === t ? 'white' : '#7A7068', padding: '6px 14px' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your caption, describe your reel idea, or drop your script here..."
              className="w-full rounded-xl p-4 text-sm resize-none outline-none focus:ring-2 focus:ring-[#C05A38]/30"
              style={{ background: '#E8E0D4', color: '#2B2218', minHeight: 180, border: 'none', fontFamily: 'Plus Jakarta Sans' }}
              maxLength={2000}
            />
            <span className="absolute bottom-3 right-3 text-xs tabular-nums" style={{ color: '#B0A89C' }}>{text.length}/2000</span>
          </div>

          <div className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-6 gap-2 cursor-pointer hover:bg-[#E8E0D4]/50 transition-all"
            style={{ borderColor: '#DDD6CA' }}>
            <Upload size={22} style={{ color: '#C05A38' }}/>
            <p className="text-sm" style={{ color: '#7A7068' }}>Drop thumbnail or media here</p>
            <p className="text-xs" style={{ color: '#B0A89C' }}>PNG, JPG, MP4 up to 50MB</p>
          </div>

          <button onClick={handleAnalyze} className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base font-semibold">
            <Sparkles size={16}/> Analyze Virality
          </button>
        </div>

        {/* Right — Results */}
        <div className="space-y-5">
          {/* Score */}
          <div className="card flex flex-col items-center">
            <div className="flex items-center justify-between mb-4 w-full">
              <h2 className="text-[17px] font-semibold" style={{ color: '#2B2218' }}>Virality Score</h2>
              {analyzed && <span className="pill" style={{ background: '#EEF4EC', color: '#7A9A6E', padding: '4px 12px', fontSize: 12 }}>Analyzed</span>}
            </div>
            <GaugeChart score={analyzed ? 87 : 0}/>
            <p className="text-sm font-semibold mt-2" style={{ color: analyzed ? '#7A9A6E' : '#B0A89C' }}>
              {analyzed ? 'High Viral Potential' : 'Submit content to analyze'}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4 w-full">
              {[['Shareability','92'],['Eng. Fit','78'],['Trend Match','88']].map(([l,v])=>(
                <div key={l} className="subcard text-center">
                  <div className="text-lg font-bold tabular-nums" style={{ color: analyzed ? '#C05A38' : '#B0A89C' }}>{analyzed ? v : '—'}</div>
                  <div className="text-[10px]" style={{ color: '#7A7068' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="card">
            <h2 className="text-[17px] font-semibold mb-3" style={{ color: '#2B2218' }}>AI Suggestions</h2>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#E8E0D4' }}>
                      <Leaf size={13} style={{ color: '#7A9A6E' }}/>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: '#2B2218' }}>{s.text}</p>
                    <span className="pill text-[10px] shrink-0 mt-0.5 font-semibold"
                      style={{ background: `${impactColor[s.impact]}18`, color: impactColor[s.impact], padding: '3px 10px' }}>
                      {s.impact}
                    </span>
                  </div>
                  {i < suggestions.length - 1 && <div className="border-b mt-3" style={{ borderColor: '#DDD6CA' }}/>}
                </div>
              ))}
            </div>
          </div>

          {/* Predicted Reach */}
          <div className="card">
            <h2 className="text-[17px] font-semibold mb-3" style={{ color: '#2B2218' }}>Predicted Reach</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Est. Reach','245K'],['Est. Impressions','1.2M']].map(([l,v])=>(
                <div key={l} className="subcard">
                  <div className="flex items-center gap-1 mb-1">
                    <ArrowUp size={13} style={{ color: '#7A9A6E' }}/>
                    <span className="text-xs" style={{ color: '#7A7068' }}>{l}</span>
                  </div>
                  <div className="text-2xl font-bold tabular-nums" style={{ color: analyzed ? '#2B2218' : '#B0A89C' }}>{analyzed ? v : '—'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
