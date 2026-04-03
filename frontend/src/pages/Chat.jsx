import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Zap, TrendingUp, BarChart2, Map, Leaf } from 'lucide-react';

const suggestedPrompts = [
  "How can this reel go viral?",
  "Best hashtags for my post",
  "Improve my caption",
  "When should I post today?",
];

const actions = [
  { icon: Zap, label: 'Generate Caption', arrow: '→' },
  { icon: TrendingUp, label: 'Analyze Trend', arrow: '→' },
  { icon: BarChart2, label: 'Predict Virality', arrow: '→' },
  { icon: Map, label: 'Plan Strategy', arrow: '→' },
];

const tips = [
  'Reels with trending audio get 3× more reach in the first hour.',
  'Post at 6–8PM local time for your highest engagement window.',
  'Carousels save rate is 47% higher than single image posts.',
];

const initialMessages = [
  {
    id: 1, role: 'ai',
    text: "Hi! I'm ViralPulse AI 👋 I can help you go viral, craft content, find trending topics, and build your strategy. What can I help you with today?",
  },
  {
    id: 2, role: 'user',
    text: "What's trending on TikTok right now?",
  },
  {
    id: 3, role: 'ai',
    text: "Based on real-time data, here are today's top TikTok trends:",
    hashtags: ['🔥 #CreatorEconomy', '🔥 #AIContent', '#ViralDance2025', '#BehindTheScenes', '#MarketingTips'],
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text };
    const aiMsg = {
      id: Date.now()+1, role: 'ai',
      text: `Great question! Here's what ViralPulse AI recommends for: "${text}". Posting between 6–8PM with trending audio can boost your reach by up to 3×. Would you like a detailed content plan?`
    };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="px-4 md:px-8 py-6 relative z-10 h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#2B2218' }}>AI Assistant</h1>
        <div className="flex gap-2">
          <button className="btn-ghost text-sm">Clear Chat</button>
          <button className="btn-secondary text-sm">New Session</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100%-80px)]">
        {/* Left — Chat */}
        <div className="lg:col-span-2 card flex flex-col h-full min-h-[500px] overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1" style={{ background: '#EDE8DF', borderRadius: 16, padding: 16, marginBottom: 8 }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: '#C05A38' }}>VP</div>
                )}
                <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${msg.role==='user'?'max-w-[70%]':''}`}
                  style={{
                    background: msg.role === 'user' ? '#C05A38' : '#FAF7F2',
                    color: msg.role === 'user' ? 'white' : '#2B2218',
                    border: msg.role === 'ai' ? '1px solid #DDD6CA' : 'none',
                  }}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.hashtags && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {msg.hashtags.map(h => (
                        <span key={h} className="pill text-xs"
                          style={{ background: h.startsWith('🔥')?'#C05A38':'#E8E0D4', color: h.startsWith('🔥')?'white':'#2B2218', padding:'3px 10px' }}>
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef}/>
          </div>

          {/* Quick prompts */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {suggestedPrompts.map(p => (
              <button key={p} onClick={() => send(p)} className="pill text-xs whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#DDD6CA] transition-all"
                style={{ background: '#E8E0D4', color: '#7A7068', padding: '6px 14px' }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-2 rounded-full" style={{ background: '#F0EBE3', border: '1px solid #DDD6CA' }}>
            <button className="p-2 btn-ghost rounded-full shrink-0"><Paperclip size={16}/></button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send(input)}
              placeholder="Ask ViralPulse AI..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#2B2218', fontFamily: 'Plus Jakarta Sans' }}
            />
            <button onClick={() => send(input)} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#C05A38' }}>
              <Send size={15} color="white"/>
            </button>
          </div>
        </div>

        {/* Right — Context */}
        <div className="space-y-4 hidden lg:block">
          {/* Session */}
          <div className="card">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#2B2218' }}>Active Session</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#7A7068' }}>Platform</span>
                <span className="pill text-[11px]" style={{ background: '#C05A38', color: 'white', padding:'2px 10px' }}>TikTok</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#7A7068' }}>Topic</span>
                <span className="text-xs font-medium" style={{ color: '#2B2218' }}>Viral Content</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#7A7068' }}>Messages</span>
                <span className="text-xs font-bold tabular-nums" style={{ color: '#C05A38' }}>{messages.length}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#2B2218' }}>Quick Actions</h3>
            <div className="space-y-2">
              {actions.map(({ icon: Icon, label }) => (
                <button key={label} onClick={() => send(label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-[#DDD6CA] text-left"
                  style={{ background: '#E8E0D4' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#DDD6CA' }}>
                    <Icon size={13} style={{ color: '#7A9A6E' }}/>
                  </div>
                  <span className="flex-1 text-sm" style={{ color: '#2B2218' }}>{label}</span>
                  <span style={{ color: '#C05A38' }}>→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#2B2218' }}>Recent AI Tips</h3>
            <div className="space-y-2">
              {tips.map((t, i) => (
                <div key={i} className="subcard flex items-start gap-2">
                  <Leaf size={12} style={{ color: '#7A9A6E', marginTop: 2, shrink: 0 }}/>
                  <p className="text-xs leading-relaxed" style={{ color: '#2B2218' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
