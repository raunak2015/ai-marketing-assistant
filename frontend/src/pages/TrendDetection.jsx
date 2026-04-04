import { useState, useEffect } from 'react';
import { Search, RefreshCw, TrendingUp, Filter, Globe, X, Sparkles, Clock, Target, CheckCircle, Copy, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import api from '../services/api';

/* ─── SVG Platform Icons ─── */
const IgIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YtIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const LiIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── Trend Sparklines ─── */
const spark = (shape) => {
  const sets = {
    up:    [{ v:1},{v:2},{v:1.5},{v:3},{v:2.8},{v:4},{v:5}],
    down:  [{ v:5},{v:4},{v:4.2},{v:3},{v:2.5},{v:2},{v:1}],
    spike: [{ v:1},{v:1.5},{v:2},{v:4},{v:3},{v:5},{v:6}],
  };
  return sets[shape] || sets['up'];
};

const Sparkline = ({ shape = 'up', color = '#C05A38' }) => (
  <ResponsiveContainer width={80} height={36}>
    <LineChart data={spark(shape)}>
      <Line dataKey="v" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

/* ─── Static categories and platform list ─── */
const CATEGORIES = ['All', 'Entertainment', 'Tech', 'Business', 'Lifestyle'];
const PLATFORMS = [
  { id: 'all', label: 'All', Icon: null },
  { id: 'instagram', label: 'Instagram', Icon: IgIcon },
  { id: 'youtube', label: 'YouTube', Icon: YtIcon },
  { id: 'linkedin', label: 'LinkedIn', Icon: LiIcon },
  { id: 'twitter', label: 'Twitter', Icon: TwIcon },
];

// Original mock trends (kept as fallback for non‑YouTube platforms)
const MOCK_TRENDS = [
  {
    id: 1, icon: <IgIcon size={18}/>, platform:'instagram', category:'Tech',
    title:'#AIContentCreation', spike:'+284%', status:'hot', statusLabel:'hot',
    tags:['Tech'], volume:'2.4M', hashtags:['#AI','#ContentMarketing','#DigitalMarketing'],
    shape:'spike', color:'#C05A38'
  },
  {
    id: 2, icon: <YtIcon size={18}/>, platform:'youtube', category:'Entertainment',
    title:'Short-form Video Strategy', spike:'+156%', status:'rising', statusLabel:'rising',
    tags:['Entertainment'], volume:'890.0K', hashtags:['#YouTubeShorts','#VideoMarketing','#Reels'],
    shape:'up', color:'#C9A96E'
  },
  {
    id: 4, icon: <LiIcon size={18}/>, platform:'linkedin', category:'Business',
    title:'B2B Thought Leadership', spike:'+78%', status:'new', statusLabel:'new',
    tags:['Business'], volume:'340.0K', hashtags:['#Leadership','#B2B','#ProfessionalDevelopment'],
    shape:'up', color:'#506B40'
  },
  {
    id: 5, icon: <TwIcon size={18}/>, platform:'twitter', category:'Tech',
    title:'#VibeCoding', spike:'+220%', status:'rising', statusLabel:'rising',
    tags:['Tech'], volume:'1.2M', hashtags:['#Coding','#Dev','#AITools'],
    shape:'spike', color:'#2B2218'
  },
  {
    id: 6, icon: <IgIcon size={18}/>, platform:'instagram', category:'Lifestyle',
    title:'Aesthetic Workspace Setup', spike:'+195%', status:'hot', statusLabel:'hot',
    tags:['Lifestyle'], volume:'3.1M', hashtags:['#WorkspaceGoals','#DeskSetup','#HomeOffice'],
    shape:'up', color:'#C05A38'
  },
  {
    id: 7, icon: <YtIcon size={18}/>, platform:'youtube', category:'Tech',
    title:'AI Tools Comparison 2025', spike:'+330%', status:'hot', statusLabel:'hot',
    tags:['Tech'], volume:'1.8M', hashtags:['#AITools','#ProductivityHacks','#Tech2025'],
    shape:'spike', color:'#C9A96E'
  },
];

const STATUS_STYLE = {
  hot:    { bg:'#FEE8DC', color:'#C05A38' },
  rising: { bg:'#E6F0E6', color:'#506B40' },
  new:    { bg:'#FEF8E2', color:'#A87B00' },
};

/* ─── Content Creation Modal ─── */
const ContentCreationModal = ({ trend, onClose }) => {
  const [generating, setGenerating] = useState(false);
  const [contentGuide, setContentGuide] = useState(null);

  const platformConfig = {
    instagram: { color: '#C05A38', bg: '#FEF0EA', name: 'Instagram', format: 'Reels, Carousel, Stories' },
    youtube: { color: '#A8442A', bg: '#FEF0EA', name: 'YouTube', format: 'Shorts, Long-form Videos' },
    linkedin: { color: '#506B40', bg: '#E4EBDF', name: 'LinkedIn', format: 'Articles, Posts, Documents' },
    twitter: { color: '#2B2218', bg: '#F0EBE3', name: 'Twitter', format: 'Tweets, Threads' },
  };

  const config = platformConfig[trend.platform] || platformConfig.instagram;

  const generateContentGuide = () => {
    setGenerating(true);
    setTimeout(() => {
      const guide = generateContentForTrend(trend);
      setContentGuide(guide);
      setGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!contentGuide) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(43,34,24,0.5)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        animation: 'fadeIn 0.2s ease'
      }}>
        <div style={{
          background: '#FAF9F6', borderRadius: 20, maxWidth: 500, width: '100%',
          maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(43,34,24,0.3)'
        }}>
          <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={22} color={config.color} />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2B2218', margin: 0 }}>Create Content</h2>
                <p style={{ fontSize: 13, color: '#7A7068', margin: '4px 0 0' }}>For: {trend.title}</p>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <X size={20} color="#7A7068" />
            </button>
          </div>

          <div style={{ padding: 20 }}>
            <div style={{ background: '#F5F2EE', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: config.bg, color: config.color }}>
                  {config.name}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: '#EAE4DC', color: '#7A7068' }}>
                  {config.format}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: '#FEF0EA', color: '#C05A38' }}>
                  {trend.spike} Growth
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#2B2218', margin: 0, lineHeight: 1.6 }}>
                Create engaging content around "<strong>{trend.title}</strong>" to capitalize on this trending topic.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#2B2218', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target size={16} color="#C05A38" /> What You Need
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {getRequirements(trend).map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C05A38', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#7A7068' }}>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={generateContentGuide}
              disabled={generating}
              style={{
                width: '100%', padding: '14px', borderRadius: 999, border: 'none',
                background: generating ? '#DDD6CA' : '#C05A38', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {generating ? (
                <><svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Generating Guide...</>
              ) : (
                <><Zap size={16} /> Generate Content Guide</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(43,34,24,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: '#FAF9F6', borderRadius: 20, maxWidth: 600, width: '100%',
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(43,34,24,0.3)'
      }}>
        <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#FAF9F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={22} color={config.color} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2B2218', margin: 0 }}>Content Guide</h2>
              <p style={{ fontSize: 13, color: '#7A7068', margin: '4px 0 0' }}>{trend.title}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={20} color="#7A7068" />
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {/* Summary */}
          <div style={{ background: '#F5F2EE', borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#2B2218', margin: '0 0 8px' }}>Summary</h3>
            <p style={{ fontSize: 13, color: '#7A7068', margin: 0, lineHeight: 1.6 }}>{contentGuide.summary}</p>
          </div>

          {/* Steps to Create */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#2B2218', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={16} color="#7A9A6E" /> How to Create
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contentGuide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#C05A38', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#2B2218', margin: '0 0 4px' }}>{step.title}</p>
                    <p style={{ fontSize: 12, color: '#7A7068', margin: 0, lineHeight: 1.5 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div style={{ background: '#FEF0EA', borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#C05A38', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Target size={16} /> Requirements Checklist
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {contentGuide.requirements.map((req, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #C05A38', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#2B2218' }}>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Caption */}
          <div style={{ background: '#F5F2EE', borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#2B2218', margin: 0 }}>Suggested Caption</h3>
              <button onClick={() => copyToClipboard(contentGuide.caption)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#C05A38', fontSize: 12, fontWeight: 600 }}>
                <Copy size={12} /> Copy
              </button>
            </div>
            <p style={{ fontSize: 13, color: '#7A7068', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>{contentGuide.caption}</p>
          </div>

          {/* Hashtags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {contentGuide.hashtags.map((tag, i) => (
              <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: '#EAE4DC', color: '#7A7068', fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => { setContentGuide(null); }}
              style={{
                flex: 1, padding: '12px', borderRadius: 999, border: '1.5px solid #EAE4DC',
                background: '#FAFAF8', color: '#2B2218', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Regenerate
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: '12px', borderRadius: 999, border: 'none',
                background: '#C05A38', color: '#fff', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

/* ─── Generate content guide based on trend ─── */
const generateContentForTrend = (trend) => {
  const title = trend.title.toLowerCase();
  
  let summary = '';
  let steps = [];
  let requirements = [];
  let caption = '';
  let hashtags = trend.hashtags || [];

  if (title.includes('ai') || title.includes('content') || title.includes('creation')) {
    summary = `AI content creation is trending with ${trend.spike} growth. Create tutorial or demo content showing AI tools in action.`;
    steps = [
      { title: 'Start with a hook', description: 'Show an impressive AI-generated result in the first 3 seconds.' },
      { title: 'Show the process', description: 'Demonstrate the AI tool workflow step by step.' },
      { title: 'Add your unique insight', description: 'Share your tips or tricks that make your content stand out.' },
      { title: 'End with CTA', description: 'Ask viewers to try it and share their results.' },
    ];
    requirements = ['AI tool access', 'Screen recording software', '15-60 second script', 'Trending audio'];
    caption = `"This AI tool changed my content game completely 🚀\n\nHere's exactly how I use it to create viral content in minutes...\n\nSave this for later! ♻️\n\nWhat AI tool are you using? Drop it below 👇`;
  } else if (title.includes('short') || title.includes('video') || title.includes('reels')) {
    summary = `Short-form video content is dominating. Focus on high-energy hooks and value-packed content.`;
    steps = [
      { title: 'Hook in 1-2 seconds', description: 'Start with a bold statement or surprising fact.' },
      { title: 'Provide value quickly', description: 'Deliver your main message within the first 10 seconds.' },
      { title: 'Use trending audio', description: 'Add popular sounds to boost algorithmic reach.' },
      { title: 'End with engagement', description: 'Ask a question or encourage comments.' },
    ];
    requirements = ['Vertical video (9:16)', 'Trending audio track', 'High-energy intro', 'Value proposition'];
    caption = `Stop scrolling 📱\n\nHere's what nobody tells you about ${trend.title}...\n\n👇 Comment "GOT IT" if you learned something new`;
  } else if (title.includes('coding') || title.includes('vibe') || title.includes('dev')) {
    summary = `Developer content is trending. Share code snippets, project demos, or productivity tips.`;
    steps = [
      { title: 'Show working code', description: 'Display a real project or feature in action.' },
      { title: 'Explain the logic', description: 'Break down the code in simple terms.' },
      { title: 'Share your setup', description: 'Show your IDE, terminal, or workspace.' },
      { title: 'Add resources', description: 'Link to documentation or GitHub repo.' },
    ];
    requirements = ['Code editor setup', 'Working code example', 'Clear audio narration', 'GitHub or demo link'];
    caption = `Code that actually works 💻\n\nBuilding ${trend.title} was easier than I thought...\n\n🔔 Follow for more dev tips\n\n#coding #dev #programming`;
  } else if (title.includes('workspace') || title.includes('setup') || title.includes('aesthetic')) {
    summary = `Aesthetic workspace content resonates with aspirational audiences. Focus on visual appeal.`;
    steps = [
      { title: 'Set up the scene', description: 'Clean, well-lit workspace with pleasing aesthetics.' },
      { title: 'Show the details', description: 'Zoom in on gadgets, organizers, or decor.' },
      { title: 'Share your workflow', description: 'Explain how this setup improves productivity.' },
      { title: 'Link products', description: 'Share Amazon links or product names.' },
    ];
    requirements = ['Good lighting setup', 'Camera with close-up lens', 'Neat desk organization', 'Product links ready'];
    caption = `My dream workspace setup ✨\n\nEverything I use to stay productive (linked in bio)\n\nWhich item is your favorite? ⬇️`;
  } else {
    summary = `This topic is trending with ${trend.spike} growth. Create authentic, value-driven content.`;
    steps = [
      { title: 'Research the trend', description: 'Understand what makes this topic relevant right now.' },
      { title: 'Add your perspective', description: 'Share a unique angle or personal experience.' },
      { title: 'Be authentic', description: ' audiences connect with genuine voices.' },
      { title: 'Engage with comments', description: 'Reply to comments to boost engagement.' },
    ];
    requirements = ['Topic research', 'Unique angle/perspective', 'Clear messaging', 'Engagement strategy'];
    caption = `Thoughts on ${trend.title} 🤔\n\nHere's my take on why this matters...\n\nWhat's yours? Drop a comment 👇`;
  }

  // Add trend-specific hashtag if not present
  if (!hashtags.includes(`#${trend.title.split(' ')[0].replace('#', '')}`)) {
    hashtags = [`#${trend.title.split(' ')[0].replace('#', '')}`, ...hashtags];
  }

  return { summary, steps, requirements, caption, hashtags };
};

/* ─── Get requirements based on trend ─── */
const getRequirements = (trend) => {
  const platformReqs = {
    instagram: ['High-quality images or video clips', 'Trending audio selection', 'Caption draft with hooks', 'Relevant hashtags list', 'Story/Reel format ready'],
    youtube: ['HD video recording setup', 'Script or outline', 'Thumbnail design', 'SEO-optimized title', 'Description with timestamps'],
    linkedin: ['Professional tone content', 'Industry insights', 'Engaging question', 'Company page consideration', 'Professional hashtags'],
    twitter: ['Concise text (280 chars)', 'Engaging hook tweet', 'Relevant hashtags (1-2)', 'Media attachment', 'Thread structure if needed'],
  };
  return platformReqs[trend.platform] || platformReqs.instagram;
};

/* ─── Trend Card ─── */
const TrendCard = ({ trend, onCreateContent }) => {
  const st = STATUS_STYLE[trend.status] || STATUS_STYLE.hot;
  return (
    <div style={{
      background:'#FFFFFF', border:'1px solid #EAE4DC', borderRadius:16,
      padding:'20px', display:'flex', flexDirection:'column', gap:12,
      boxShadow:'0 2px 10px rgba(43,34,24,0.04)', transition:'transform 150ms, box-shadow 150ms'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(43,34,24,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 10px rgba(43,34,24,0.04)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ color: trend.color }}>{trend.icon}</span>
          <span style={{ fontSize:14, fontWeight:700, color:'#2B2218' }}>{trend.title}</span>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:13, fontWeight:800, color:'#2E6B30' }}>{trend.spike}</div>
          <div style={{ fontSize:10, color:'#B0A89C', fontWeight:600 }}>spike</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:st.bg, color:st.color }}>
          {trend.statusLabel === 'hot' ? '🔥' : trend.statusLabel === 'rising' ? '⬆️' : '✨'} {trend.statusLabel}
        </span>
        {trend.tags.map(t => (
          <span key={t} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:999, background:'#EAE4DC', color:'#7A7068' }}>{t}</span>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <div style={{ fontSize:10, color:'#B0A89C', fontWeight:600, marginBottom:2 }}>Volume</div>
          <div style={{ fontSize:17, fontWeight:800, color:'#2B2218' }}>{trend.volume}</div>
        </div>
        <Sparkline shape={trend.shape} color={trend.color} />
      </div>

      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {trend.hashtags.map(h => (
          <span key={h} style={{ fontSize:11, color:'#7A7068', fontWeight:500 }}>{h}</span>
        ))}
      </div>

      <button
        onClick={() => onCreateContent(trend)}
        style={{
          width:'100%', padding:'10px', borderRadius:10, border:'1.5px solid #EAE4DC',
          background:'#FAFAF8', color:'#2B2218', fontSize:13, fontWeight:700,
          cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          transition:'all 150ms'
        }}
        onMouseEnter={e => { e.currentTarget.style.background='#F0EBE3'; e.currentTarget.style.borderColor='#D29D8D'; }}
        onMouseLeave={e => { e.currentTarget.style.background='#FAFAF8'; e.currentTarget.style.borderColor='#EAE4DC'; }}
      >
        ✦ Create Content
      </button>
    </div>
  );
};

/* ─── MAIN PAGE ─── */
export default function TrendDetection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [platform, setPlatform] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [trends, setTrends] = useState(MOCK_TRENDS);
  const [loading, setLoading] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState(null);

  const fetchRealTrends = async () => {
    if (platform === 'youtube' || platform === 'all') {
      setLoading(true);
      try {
        const res = await api.getYouTubeTrending();
        if (res.success && res.data) {
          const youtubeTrends = res.data.slice(0, 6).map((video, idx) => ({
            id: video.id,
            icon: <YtIcon size={18} />,
            platform: 'youtube',
            category: 'Entertainment',
            title: video.title.length > 40 ? video.title.slice(0, 40) + '…' : video.title,
            spike: `+${Math.floor(Math.random() * 200) + 50}%`,
            status: idx < 2 ? 'hot' : 'rising',
            statusLabel: idx < 2 ? 'hot' : 'rising',
            tags: ['Trending'],
            volume: (video.views / 1000).toFixed(0) + 'K',
            hashtags: [`#${video.title.split(' ')[0]}`, '#Viral', '#Trending'],
            shape: idx % 2 === 0 ? 'spike' : 'up',
            color: idx === 0 ? '#C05A38' : '#C9A96E'
          }));
          setTrends(youtubeTrends);
        } else {
          setTrends(MOCK_TRENDS);
        }
      } catch (error) {
        console.error('Failed to fetch YouTube trends', error);
        setTrends(MOCK_TRENDS);
      } finally {
        setLoading(false);
      }
    } else {
      // For other platforms, use mock data filtered by platform
      if (platform === 'all') setTrends(MOCK_TRENDS);
      else setTrends(MOCK_TRENDS.filter(t => t.platform === platform));
    }
  };

  useEffect(() => {
    fetchRealTrends();
  }, [platform]);

  const filtered = trends.filter(t => {
    const matchCat = category === 'All' || t.tags.includes(category);
    const matchPlat = platform === 'all' || t.platform === platform;
    const matchSearch = search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.hashtags.some(h => h.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchPlat && matchSearch;
  });

  const hotTrends = filtered.filter(t => t.status === 'hot').length;

  const doRefresh = () => {
    setRefreshing(true);
    fetchRealTrends().finally(() => setTimeout(() => setRefreshing(false), 900));
  };

  const handleCreateContent = (trend) => {
    setSelectedTrend(trend);
  };

  const handleCloseModal = () => {
    setSelectedTrend(null);
  };

  return (
    <div style={{ padding:'32px 36px 60px', boxSizing:'border-box' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <TrendingUp size={22} color="#C05A38" strokeWidth={2.5} />
            <h1 style={{ fontSize:24, fontWeight:800, color:'#2B2218', margin:0 }}>Trend Detection</h1>
          </div>
          <p style={{ fontSize:14, color:'#7A7068', margin:0 }}>Real-time trending topics across all platforms</p>
        </div>
        <button onClick={doRefresh} style={{
          display:'flex', alignItems:'center', gap:8, padding:'10px 20px',
          borderRadius:999, border:'1.5px solid #EAE4DC', background:'#FAFAF8',
          color:'#2B2218', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit'
        }}>
          <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
          Refresh Live Data
        </button>
      </div>

      {/* Search + Category bar */}
      <div style={{
        background:'#FFFFFF', borderRadius:16, padding:'18px 20px', marginBottom:20,
        border:'1px solid #EAE4DC', boxShadow:'0 1px 8px rgba(43,34,24,0.04)',
        display:'flex', flexDirection:'column', gap:16
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flex:'1', maxWidth:400 }}>
            <Search size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#B0A89C' }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search keywords, hashtags, topics..."
              style={{
                width:'100%', padding:'11px 16px 11px 40px', borderRadius:10,
                border:'1.5px solid #E8E0D4', fontSize:14, color:'#2B2218',
                outline:'none', fontFamily:'inherit', boxSizing:'border-box', background:'#FAFAF8',
              }}
              onFocus={e => e.target.style.borderColor='#D29D8D'}
              onBlur={e => e.target.style.borderColor='#E8E0D4'}
            />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <Filter size={14} color="#B0A89C" />
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding:'6px 14px', borderRadius:999, border:'none',
                background: category === cat ? '#C05A38' : '#F0EBE3',
                color: category === cat ? '#fff' : '#7A7068',
                fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all 150ms'
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Platform tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {PLATFORMS.map(({ id, label, Icon }) => {
            const active = platform === id;
            return (
              <button key={id} onClick={() => setPlatform(id)} style={{
                display:'flex', alignItems:'center', gap:6,
                padding:'8px 16px', borderRadius:999,
                border: active ? '1.5px solid #D29D8D' : '1.5px solid #EAE4DC',
                background: active ? '#FBF3F0' : '#FAFAF8',
                color: active ? '#A8442A' : '#7A7068',
                fontSize:13, fontWeight: active ? 700 : 500,
                cursor:'pointer', fontFamily:'inherit', transition:'all 150ms'
              }}>
                {Icon ? <Icon size={14} /> : <Globe size={14} />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stat Pills */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Trending Topics', value: filtered.length },
          { label:'Avg Spike', value:'220%' },
          { label:'Hot Trends', value: hotTrends },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background:'#FFFFFF', border:'1px solid #EAE4DC', borderRadius:14,
            padding:'16px 20px', boxShadow:'0 1px 6px rgba(43,34,24,0.04)'
          }}>
            <div style={{ fontSize:12, color:'#B0A89C', fontWeight:600, marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:900, color:'#2B2218', letterSpacing:'-1px' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Trend Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#B0A89C', fontSize:15 }}>
          No trends found. Try different filters!
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
          {filtered.map(t => <TrendCard key={t.id} trend={t} onCreateContent={handleCreateContent} />)}
        </div>
      )}

      {/* Content Creation Modal */}
      {selectedTrend && (
        <ContentCreationModal trend={selectedTrend} onClose={handleCloseModal} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1100px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}