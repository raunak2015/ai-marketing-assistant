import { useState, useEffect } from 'react';
import { 
  User, Link2, BarChart3, Zap, Bell, Palette, Shield, 
  Camera, Check, LogOut, ChevronRight, ArrowUpRight, 
  ArrowDownRight, Star, Crown, Globe, Monitor, Smartphone, 
  Download, Trash2, Eye, EyeOff, Plus, Play, Info, Leaf, Sparkles
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/* ─── CUSTOM SOCIAL ICONS ─── */
const Instagram = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const Youtube = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const Twitter = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

/* ─── COLORS ─── */
const COLORS = {
  bg: '#EDE8DF',
  card: '#FAF7F2',
  chip: '#E8E0D4',
  primary: '#C05A38',
  primaryHover: '#A8442A',
  positive: '#7A9A6E',
  secondary: '#C9A96E',
  dark: '#506B40',
  text: '#2B2218',
  muted: '#7A7068',
  faint: '#B0A89C',
  divider: '#DDD6CA',
};

/* ─── MOCK DATA ─── */
const NAV_ITEMS = [
  { id: 'Personal Info', icon: User, label: 'Personal Info' },
  { id: 'Connected Accounts', icon: Link2, label: 'Connected Accounts' },
  { id: 'My Analytics Summary', icon: BarChart3, label: 'My Analytics Summary' },
  { id: 'AI Usage & Credits', icon: Zap, label: 'AI Usage & Credits' },
  { id: 'Notifications', icon: Bell, label: 'Notifications' },
  { id: 'Appearance & Theme', icon: Palette, label: 'Appearance & Theme' },
  { id: 'Privacy & Security', icon: Shield, label: 'Privacy & Security' },
];

const ROLES = [
  { id: 'Creator', label: 'Creator', icon: Palette },
  { id: 'Startup', label: 'Startup', icon: Zap },
  { id: 'Business', label: 'Business', icon: Crown },
  { id: 'Agency', label: 'Agency', icon: Globe },
];

const NICHES = [
  "Tech", "Lifestyle", "Fashion", "Finance", "Health & Fitness", 
  "Food", "Travel", "Education", "Gaming", "Business", "AI & SaaS", "Entertainment"
];

const SOCIALS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#C05A38', handle: '@pritesh_cg', status: 'Connected', lastSync: '5 min ago' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#C9A96E', handle: 'Pritesh Sharma', status: 'Connected', lastSync: '12 min ago' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#506B40', handle: 'Not connected', status: 'Not Connected', lastSync: null },
  { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: '#7A7068', handle: 'Not connected', status: 'Not Connected', lastSync: null },
];

const ANALYTICS_STATS = [
  { label: 'Total Reach', value: '428K', delta: '▲ 8%', pos: true },
  { label: 'Avg. Virality Score', value: '87', delta: '▲ 12%', pos: true },
  { label: 'Top Platform', value: 'IG', delta: 'Steady', pos: true },
  { label: 'Posts Analyzed', value: '142', delta: '▲ 4%', pos: true },
];

const ENGAGEMENT_DATA = [
  { day: 'Mon', engagement: 400 },
  { day: 'Tue', engagement: 300 },
  { day: 'Wed', engagement: 600 },
  { day: 'Thu', engagement: 500 },
  { day: 'Fri', engagement: 800 },
  { day: 'Sat', engagement: 700 },
  { day: 'Sun', engagement: 900 },
];

/* ─── CUSTOM COMPONENTS ─── */

const SectionCard = ({ title, subtitle, children, extra, noPadding = false }) => (
  <div style={{
    background: COLORS.card,
    borderRadius: 20,
    border: `1px solid ${COLORS.divider}`,
    boxShadow: '0 4px 20px rgba(43,34,24,0.04)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'fadeIn 180ms ease'
  }}>
    {(title || subtitle) && (
      <div style={{ padding: '24px 28px 16px', borderBottom: noPadding ? `1px solid ${COLORS.divider}` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          {title && <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: 0 }}>{title}</h2>}
          {extra}
        </div>
        {subtitle && <p style={{ fontSize: 13, color: COLORS.muted, margin: 0 }}>{subtitle}</p>}
      </div>
    )}
    <div style={{ padding: noPadding ? 0 : '0 28px 28px', flex: 1 }}>{children}</div>
  </div>
);

const ToggleSwitch = ({ on, onChange }) => (
  <button 
    onClick={() => onChange(!on)}
    style={{
      width: 44, height: 24, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: on ? COLORS.primary : COLORS.chip, transition: 'background 200ms',
      position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px'
    }}>
    <div style={{
      width: 20, height: 20, borderRadius: '50%', background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 200ms',
      transform: on ? 'translateX(20px)' : 'translateX(0)'
    }}/>
  </button>
);

const FormField = ({ label, type = 'text', placeholder, defaultValue, icon: Icon, fullWidth = false }) => (
  <div style={{ flex: fullWidth ? '1 1 100%' : '1 1 45%', minWidth: fullWidth ? '100%' : 200 }}>
    {label && <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>{label}</label>}
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: COLORS.muted }}/>}
      <input 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width: '100%', padding: Icon ? '12px 16px 12px 40px' : '12px 16px',
          borderRadius: 12, border: `1px solid ${COLORS.divider}`,
          background: COLORS.chip, color: COLORS.text, fontSize: 14,
          fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
        }}
        onFocus={(e) => { e.target.style.background = '#FAF7F2'; e.target.style.border = `2px solid ${COLORS.primary}`; }}
        onBlur={(e) => { e.target.style.background = COLORS.chip; e.target.style.border = `1px solid ${COLORS.divider}`; }}
      />
    </div>
  </div>
);

/* ─── SECTION CONTENT COMPONENTS ─── */

const PersonalInfo = () => {
  const [selectedRole, setSelectedRole] = useState('Creator');
  const [selectedNiches, setSelectedNiches] = useState(['Tech', 'AI & SaaS']);

  const toggleNiche = (n) => {
    if (selectedNiches.includes(n)) setSelectedNiches(prev => prev.filter(x => x !== n));
    else if (selectedNiches.length < 5) setSelectedNiches(prev => [...prev, n]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #C05A38, #C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 800 }}>P</div>
          <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: COLORS.primary, border: '2px solid white', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Camera size={14}/>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button style={{ padding: '8px 16px', borderRadius: 999, border: `1.5px solid ${COLORS.divider}`, background: 'white', fontSize: 13, fontWeight: 700, color: COLORS.text, cursor: 'pointer' }}>Upload New Photo</button>
          <button style={{ border: 'none', background: 'none', color: COLORS.muted, fontSize: 12, cursor: 'pointer' }}>Remove Photo</button>
          <span style={{ fontSize: 11, color: COLORS.faint }}>JPG, PNG. Max 2MB</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <FormField label="Full Name" defaultValue="Pritesh Sharma" />
        <FormField label="Username" defaultValue="pritesh_cg" />
        <FormField label="Email Address" defaultValue="pritesh@viralpulse.ai" />
        <FormField label="Phone Number" defaultValue="+91 98765 43210" />
        <div style={{ width: '100%' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>Bio</label>
          <textarea 
            rows={3}
            defaultValue="Tell your audience who you are and what you create..."
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${COLORS.divider}`, background: COLORS.chip, color: COLORS.text, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'none' }}
          />
          <div style={{ textAlign: 'right', marginTop: 4, fontSize: 11, color: COLORS.faint }}>72 / 160</div>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>I am a...</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
          {ROLES.map(r => {
            const active = selectedRole === r.id;
            return (
              <button key={r.id} onClick={() => setSelectedRole(r.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 12px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: active ? COLORS.primary : COLORS.chip,
                color: active ? 'white' : COLORS.muted,
                transition: 'all 180ms ease'
              }}>
                <r.icon size={22}/>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>Your Content Niche</label>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Select up to 5</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {NICHES.map(n => {
            const active = selectedNiches.includes(n);
            return (
              <button key={n} onClick={() => toggleNiche(n)} style={{
                padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: active ? COLORS.primary : COLORS.chip,
                color: active ? 'white' : COLORS.muted,
                fontSize: 13, fontWeight: 500, transition: 'all 150ms'
              }}>
                {active && <span style={{ marginRight: 4 }}>✓</span>}
                {n}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <FormField label="Location" defaultValue="Mumbai, India" />
        <FormField label="Primary Language" defaultValue="English (US)" />
        <FormField label="Portfolio Link" icon={Globe} fullWidth placeholder="https://yourportfolio.com" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10 }}>
        <button style={{ padding: '12px 32px', borderRadius: 999, background: COLORS.primary, color: 'white', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Save Personal Info
        </button>
      </div>
    </div>
  );
};

const ConnectedAccounts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {SOCIALS.map((s, idx) => (
      <div key={s.id} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 0', borderBottom: idx < SOCIALS.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <s.icon size={22}/>
          </div>
          <div>
            <h4 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: COLORS.text }}>{s.name}</h4>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.muted }}>{s.handle}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
              background: s.status === 'Connected' ? '#E8F4EE' : COLORS.chip,
              color: s.status === 'Connected' ? COLORS.positive : COLORS.muted
            }}>
              {s.status === 'Connected' && '✓ '} {s.status}
            </span>
            {s.lastSync && <p style={{ margin: '4px 0 0', fontSize: 10, color: COLORS.faint }}>Last synced: {s.lastSync}</p>}
          </div>
          <button style={{
            padding: '8px 20px', borderRadius: 999, border: s.status === 'Connected' ? 'none' : 'none',
            background: s.status === 'Connected' ? 'transparent' : COLORS.primary,
            color: s.status === 'Connected' ? COLORS.primary : 'white',
            fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}>
            {s.status === 'Connected' ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    ))}
    <div style={{ marginTop: 12 }}>
      <button style={{ background: 'none', border: 'none', color: COLORS.muted, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        Why connect accounts? <ChevronRight size={14}/>
      </button>
    </div>
  </div>
);

const AnalyticsSummary = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div style={{ display: 'flex', gap: 12 }}>
      {['7 Days', '30 Days', '90 Days'].map(p => (
        <button key={p} style={{
          padding: '6px 16px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700,
          background: p === '30 Days' ? COLORS.primary : COLORS.chip,
          color: p === '30 Days' ? 'white' : COLORS.muted, cursor: 'pointer'
        }}>{p}</button>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
      {ANALYTICS_STATS.map((s, i) => (
        <div key={i} style={{ background: COLORS.chip, padding: 16, borderRadius: 16 }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: '0.04em' }}>{s.label.toUpperCase()}</p>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.primary, marginBottom: 8 }}>{s.value}</div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: s.pos ? COLORS.positive : COLORS.primary }}>{s.delta} this week</p>
        </div>
      ))}
    </div>

    <div style={{ background: COLORS.chip, borderRadius: 16, padding: 20 }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Engagement Over Last 7 Days</h4>
      <div style={{ height: 200, width: '100%' }}>
        <ResponsiveContainer>
          <LineChart data={ENGAGEMENT_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider}/>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.muted }}/>
            <YAxis hide/>
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.divider}`, borderRadius: 12 }}/>
            <Line type="monotone" dataKey="engagement" stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.primary }} activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div>
      <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Top Content Table</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: `1px solid ${COLORS.divider}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: COLORS.chip }}/>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Botanical Content v{i}</span>
            </div>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: COLORS.platforms?.Instagram || COLORS.primary, color: 'white', fontSize: 10, fontWeight: 700 }}>INSTAGRAM</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>87</span>
          </div>
        ))}
      </div>
      <button style={{ float: 'right', marginTop: 12, background: 'none', border: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>View Full Analytics →</button>
    </div>
  </div>
);

const AIUsage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div style={{ background: COLORS.chip, borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FEF0EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Crown size={24} style={{ color: COLORS.secondary }}/>
        </div>
        <div>
          <h4 style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 800, color: COLORS.text }}>Pro Plan — Active</h4>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>Renews on May 3, 2026</p>
        </div>
      </div>
      <button style={{ padding: '8px 20px', borderRadius: 999, background: 'white', border: `1.5px solid ${COLORS.divider}`, fontSize: 13, fontWeight: 700, color: COLORS.text, cursor: 'pointer' }}>Manage Plan</button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: 'AI Generations', used: 72, total: 100 },
        { label: 'Trend Analyses', used: 18, total: 50 },
        { label: 'Virality Scans', used: 45, total: 100 },
      ].map((m, idx) => (
        <div key={idx}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{m.label}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.primary }}>{m.used} / {m.total}</span>
          </div>
          <div style={{ height: 8, background: COLORS.chip, borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${(m.used / m.total) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})` }}/>
          </div>
          <p style={{ marginTop: 6, fontSize: 11, color: COLORS.faint }}>Resets in 12 days</p>
        </div>
      ))}
    </div>

    <div>
      <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Recent AI Activity</h4>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${COLORS.divider}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: COLORS.chip }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Action</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>Credits</th>
            </tr>
          </thead>
          <tbody>
            {[
              { action: 'Viral Prediction', date: 'Oct 24, 2025', used: 2 },
              { action: 'Trend Analysis', date: 'Oct 23, 2025', used: 5 },
              { action: 'Caption Generation', date: 'Oct 22, 2025', used: 1 },
              { action: 'Image Scan', date: 'Oct 21, 2025', used: 3 },
            ].map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? COLORS.card : COLORS.chip }}>
                <td style={{ padding: '12px 16px' }}>{r.action}</td>
                <td style={{ padding: '12px 16px', color: COLORS.muted }}>{r.date}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: COLORS.primary }}>{r.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <button style={{ padding: '14px', borderRadius: 999, background: COLORS.primary, color: 'white', border: 'none', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Buy More Credits</button>
  </div>
);

const NotificationSettings = () => {
  const [prefs, setPrefs] = useState({
    'Trend Alerts': true,
    'Virality Score Ready': true,
    'Weekly Strategy Summary': true,
    'Performance Milestones': false,
    'AI Content Tips': true,
    'Platform Sync Alerts': true,
    'New Feature Updates': false,
    'Email Digest': true
  });

  const [channels, setChannels] = useState(['In-App', 'Email']);

  const items = [
    { id: 'Trend Alerts', icon: Sparkles, desc: 'Get notified when a topic goes viral' },
    { id: 'Virality Score Ready', icon: Zap, desc: 'When your content analysis is complete' },
    { id: 'Weekly Strategy Summary', icon: Map, desc: 'AI-generated plan every Monday 8AM' },
    { id: 'Performance Milestones', icon: Star, desc: 'When a post hits a reach milestone' },
    { id: 'AI Content Tips', icon: Leaf, desc: 'Daily personalized content suggestions' },
    { id: 'Platform Sync Alerts', icon: RefreshCw, desc: 'When a connected account needs re-auth' },
    { id: 'New Feature Updates', icon: Plus, desc: 'Learn about new ViralPulse AI features' },
    { id: 'Email Digest', icon: Bell, desc: 'Weekly performance report to your email' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, idx) => (
        <div key={item.id} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', borderBottom: idx < items.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
        }}>
          <div style={{ display: 'flex', items: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: COLORS.chip, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.primary }}>
              <item.icon size={18}/>
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>{item.id}</h4>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>{item.desc}</p>
            </div>
          </div>
          <ToggleSwitch on={prefs[item.id]} onChange={(v) => setPrefs(prev => ({...prev, [item.id]: v}))}/>
        </div>
      ))}
      
      <div style={{ marginTop: 24, padding: '20px', background: COLORS.chip, borderRadius: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>Receive notifications via</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['In-App', 'Email', 'Push'].map(c => {
            const active = channels.includes(c);
            return (
              <button key={c} onClick={() => setChannels(prev => active ? prev.filter(x => x !== c) : [...prev, c])}
                style={{
                  padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: active ? COLORS.primary : 'rgba(43,34,24,0.05)',
                  color: active ? 'white' : COLORS.muted,
                  fontSize: 13, fontWeight: 600, transition: 'all 200ms'
                }}>
                {c === 'In-App' && '🔔 '}
                {c === 'Email' && '📧 '}
                {c === 'Push' && '📱 '}
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AppearanceTheme = () => {
  const [activeTheme, setActiveTheme] = useState('Warm Earthy');
  const [accent, setAccent] = useState('#C05A38');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>Choose your theme</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { id: 'Warm Earthy', sub: 'Current', bg: '#EDE8DF', accent: '#C05A38' },
            { id: 'Dark Mode', sub: 'Beta', bg: '#1A1410', accent: '#C05A38' },
            { id: 'Minimal Light', sub: 'Clean', bg: '#FFFFFF', accent: '#2B2218' },
          ].map(t => {
            const active = activeTheme === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTheme(t.id)} style={{
                borderRadius: 16, overflow: 'hidden', border: active ? `2px solid ${COLORS.primary}` : `1.5px solid ${COLORS.divider}`,
                background: COLORS.card, padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'all 180ms ease'
              }}>
                <div style={{ height: 80, background: t.bg, borderBottom: `1px solid ${COLORS.divider}`, position: 'relative' }}>
                   <div style={{ position: 'absolute', bottom: 10, left: 10, width: 30, height: 4, background: t.accent, borderRadius: 2 }}/>
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: active ? COLORS.primary : COLORS.text }}>{t.id}</span>
                    {active && <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 8 }}>✓</div>}
                  </div>
                  <span style={{ fontSize: 10, color: active ? COLORS.positive : COLORS.muted }}>{t.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>Accent Color</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {['#C05A38', '#7A9A6E', '#C9A96E', '#506B40', '#8B6BB1', '#4A90D9'].map(c => {
            const active = accent === c;
            return (
              <button key={c} onClick={() => setAccent(c)} style={{
                width: 28, height: 28, borderRadius: '50%', background: c, border: active ? 'none' : 'none', cursor: 'pointer',
                ring: active ? `2px solid ${c}` : 'none', ringOffset: 2,
                outline: active ? `2px solid ${c}` : 'none', outlineOffset: 3
              }}/>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>Default Dashboard Layout</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${COLORS.primary}`, background: '#FEF0EA', fontSize: 12, fontWeight: 700, color: COLORS.primary }}>Bento Grid</button>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${COLORS.divider}`, background: 'transparent', fontSize: 12, fontWeight: 700, color: COLORS.muted }}>List View</button>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>Text Size</label>
        <input type="range" min="1" max="3" defaultValue="2" style={{ width: '100%', accentColor: COLORS.primary }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: COLORS.muted, marginTop: 10 }}>
          <span>Small</span>
          <span style={{ fontWeight: 700, color: COLORS.primary }}>Default</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
};

const PrivacySecurity = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Change Password</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField label="Current Password" type="password" />
          <div>
            <FormField label="New Password" type="password" />
            <div style={{ height: 4, background: COLORS.chip, borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: COLORS.primary }}/>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: COLORS.primary, fontWeight: 600 }}>Weak — Try adding symbols</p>
          </div>
          <FormField label="Confirm New Password" type="password" />
        </div>
        <button style={{ marginTop: 16, padding: '10px 24px', borderRadius: 999, border: `1.5px solid ${COLORS.divider}`, background: 'white', color: COLORS.text, fontSize: 13, fontWeight: 700, float: 'right' }}>Update Password</button>
      </div>

      <div style={{ height: 1, background: COLORS.divider }}/>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <Shield size={24} style={{ color: COLORS.dark }}/>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Two-Factor Authentication</h4>
            <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>Add an extra layer of security</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {twoFactor && <span style={{ padding: '3px 10px', borderRadius: 999, background: '#E8F4EE', color: COLORS.positive, fontSize: 11, fontWeight: 700 }}>ENABLED</span>}
          <ToggleSwitch on={twoFactor} onChange={setTwoFactor} />
        </div>
      </div>

      <div style={{ height: 1, background: COLORS.divider }}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: 'Public Profile Visible', desc: 'Allow others to find your creator page' },
          { label: 'Show Analytics to Team', desc: 'Share your performance with invited members' },
          { label: 'Allow AI to learn from my content', desc: 'Help us improve your personalized suggestions' },
        ].map((p, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>{p.label}</h4>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>{p.desc}</p>
            </div>
            <ToggleSwitch on={true} onChange={() => {}}/>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: COLORS.divider }}/>

      <div>
        <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.text }}>Active Login Sessions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { device: 'MacBook Pro', info: 'Mumbai, India • Chrome', current: true, icon: Monitor },
            { device: 'iPhone 15', info: 'Mumbai, India • Safari', current: false, icon: Smartphone },
          ].map((s, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <s.icon size={20} style={{ color: COLORS.muted }}/>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{s.device}</span>
                    {s.current && <span style={{ padding: '2px 8px', borderRadius: 999, background: '#E8F4EE', color: COLORS.positive, fontSize: 10, fontWeight: 700 }}>CURRENT</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>{s.info}</p>
                </div>
              </div>
              {!s.current && <button style={{ border: 'none', background: 'none', color: COLORS.primary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Revoke Access</button>}
            </div>
          ))}
        </div>
      </div>

      <SectionCard noPadding>
        <div style={{ background: '#FAF0EE', padding: '24px 28px' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: COLORS.primary }}>Danger Zone</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h5 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>Download My Data</h5>
                <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>Get a full export of your content and analytics</p>
              </div>
              <button style={{ padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${COLORS.divider}`, background: 'white', color: COLORS.text, fontSize: 12, fontWeight: 700 }}>Request Export</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h5 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: COLORS.text }}>Delete Account</h5>
                <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>Permanently remove your account and all data</p>
              </div>
              <button style={{ border: 'none', background: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete Account</button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

/* ─── MAIN COMPONENT ─── */

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Personal Info');

  /* Fix for direct navigation from layout */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section && NAV_ITEMS.find(n => n.id === section)) {
      setActiveSection(section);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, paddingBottom: 40 }}>
      
      {/* ─── HEADER ─── */}
      <div style={{ padding: '24px 40px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>My Profile</h1>
          <p style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>Manage your creator identity and app preferences</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Preview Public Profile</button>
          <button style={{ padding: '10px 24px', borderRadius: 999, background: COLORS.primary, color: 'white', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(192,90,56,0.15)' }}>Save All Changes</button>
        </div>
      </div>

      <div style={{ padding: '0 40px' }}>
        <div style={{ height: 1, background: COLORS.divider, width: '100%', marginBottom: 28 }}/>
      </div>

      {/* ─── TWO-COLUMN CONTENT ─── */}
      <div className="profile-container" style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32, alignItems: 'start' }}>
        
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <SectionCard noPadding style={{ position: 'sticky', top: 80 }}>
            {/* Identity Card */}
            <div style={{ padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <div 
                className="avatar-container"
                style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px', cursor: 'pointer' }}
              >
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #C05A38, #7A9A6E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 800 }}>PS</div>
                <div className="avatar-hover-overlay" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0, transition: 'opacity 150ms' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={14}/>
                  </div>
                </div>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 800, color: COLORS.text }}>Pritesh Sharma</h3>
              <p style={{ margin: '0 0 16px', fontSize: 13, color: COLORS.muted }}>@pritesh_cg</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: COLORS.chip, color: COLORS.text, fontSize: 11, fontWeight: 700 }}>✦ CREATOR</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: COLORS.primary, color: 'white', fontSize: 11, fontWeight: 700 }}>🏆 PRO PLAN</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: COLORS.muted }}>
                ⭐ Virality Score: <span style={{ fontWeight: 800, color: COLORS.primary }}>87</span> <ArrowUpRight size={14} style={{ color: COLORS.positive }}/>
              </div>
              
              {/* Botanical Decoration */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.12, pointerEvents: 'none' }}>
                <Leaf size={60} style={{ color: COLORS.dark }}/>
              </div>
            </div>

            <div style={{ height: 1, background: COLORS.divider }}/>

            {/* Nav Menu */}
            <nav style={{ padding: '12px 0' }}>
              {NAV_ITEMS.map(item => {
                const active = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveSection(item.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px',
                    border: 'none', borderLeft: active ? `3px solid ${COLORS.primary}` : '3px solid transparent',
                    background: active ? COLORS.chip : 'transparent',
                    color: active ? COLORS.text : COLORS.muted,
                    fontSize: 14, fontWeight: active ? 700 : 500,
                    textAlign: 'left', cursor: 'pointer', transition: 'all 150ms'
                  }}>
                    <item.icon size={18} style={{ color: active ? COLORS.primary : COLORS.muted }}/>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div style={{ height: 1, background: COLORS.divider }}/>

            {/* Logout */}
            <div style={{ padding: '12px' }}>
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', border: 'none', background: 'none', color: COLORS.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <LogOut size={16}/> Log Out
              </button>
            </div>
          </SectionCard>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="profile-content">
          {activeSection === 'Personal Info' && (
            <SectionCard title="Personal Information" subtitle="Update your public creator profile">
              <PersonalInfo />
            </SectionCard>
          )}
          {activeSection === 'Connected Accounts' && (
            <SectionCard title="Connected Social Accounts" subtitle="Link platforms to unlock real-time analytics and posting">
              <ConnectedAccounts />
            </SectionCard>
          )}
          {activeSection === 'My Analytics Summary' && (
            <SectionCard title="Your Performance Overview" subtitle="High-level metrics across all connected platforms">
              <AnalyticsSummary />
            </SectionCard>
          )}
          {activeSection === 'AI Usage & Credits' && (
            <SectionCard title="AI Credits & Plan Usage" subtitle="Monitor your generation limits and project activities">
              <AIUsage />
            </SectionCard>
          )}
          {activeSection === 'Notifications' && (
            <SectionCard title="Notification Preferences" subtitle="Control how and when you receive ViralPulse alerts">
              <NotificationSettings />
            </SectionCard>
          )}
          {activeSection === 'Appearance & Theme' && (
            <SectionCard title="Appearance & Theme" subtitle="Customize the visual experience of your marketing tool">
              <AppearanceTheme />
            </SectionCard>
          )}
          {activeSection === 'Privacy & Security' && (
            <SectionCard title="Privacy & Security" subtitle="Manage your account access and data protection">
              <PrivacySecurity />
            </SectionCard>
          )}
        </main>
      </div>

      {/* ─── MOBILE ONLY HERO & TABS ─── */}
      <div className="mobile-profile-hero" style={{ display: 'none', padding: '0 20px 20px', textAlign: 'center' }}>
         <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #C05A38, #7A9A6E)', margin: '20px auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 800 }}>PS</div>
         <h3 style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 800, color: COLORS.text }}>Pritesh Sharma</h3>
         <p style={{ margin: '0 0 16px', fontSize: 13, color: COLORS.muted }}>@pritesh_cg</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
           <span style={{ padding: '4px 12px', borderRadius: 999, background: COLORS.chip, fontSize: 10, fontWeight: 700 }}>CREATOR</span>
           <span style={{ padding: '4px 12px', borderRadius: 999, background: COLORS.primary, color: 'white', fontSize: 10, fontWeight: 700 }}>PRO</span>
         </div>
      </div>
      
      <div className="mobile-tabs-container" style={{ display: 'none', position: 'sticky', top: 58, zIndex: 85, background: COLORS.bg, borderBottom: `1px solid ${COLORS.divider}`, padding: '12px 20px' }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
           {NAV_ITEMS.map(item => {
             const active = activeSection === item.id;
             return (
               <button key={item.id} onClick={() => setActiveSection(item.id)} style={{
                 padding: '8px 18px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap', cursor: 'pointer',
                 background: active ? COLORS.primary : COLORS.chip,
                 color: active ? 'white' : COLORS.muted,
                 fontSize: 13, fontWeight: 600
               }}>{item.label}</button>
             );
           })}
        </div>
      </div>

      {/* ─── STYLES ─── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .avatar-container:hover .avatar-hover-overlay {
          opacity: 1 !important;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 1024px) {
          .profile-container {
            grid-template-columns: 1fr !important;
          }
          .profile-sidebar { display: none; }
          .mobile-profile-hero { display: block !important; }
          .mobile-tabs-container { display: block !important; }
          .profile-content { padding-top: 20px; }
          header, div[style*="padding: 24px 40px"] {
            padding: 16px 20px !important;
          }
        }

        @media (max-width: 768px) {
          .profile-container { padding: 0 16px !important; }
        }
      `}</style>
    </div>
  );
}
