import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Zap, BarChart2, Archive,
  Bell, Settings, Menu, X, Plus, SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

/* ── Botanical top-right decoration ── */
const BotanicalTR = () => (
  <svg style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, opacity: 0.14, pointerEvents: 'none', zIndex: 0 }}
    viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M200 0 Q140 70 60 110 Q30 128 0 150" stroke="#7A9A6E" strokeWidth="1.5" fill="none"/>
    <path d="M200 20 Q150 85 85 120 Q50 140 15 170" stroke="#C05A38" strokeWidth="1" fill="none"/>
    <ellipse cx="150" cy="35" rx="28" ry="13" stroke="#7A9A6E" strokeWidth="1.2" fill="none" transform="rotate(-30 150 35)"/>
    <ellipse cx="178" cy="65" rx="22" ry="11" stroke="#C9A96E" strokeWidth="1" fill="none" transform="rotate(-45 178 65)"/>
    <ellipse cx="120" cy="28" rx="18" ry="9" stroke="#506B40" strokeWidth="1" fill="none" transform="rotate(-20 120 28)"/>
    <circle cx="155" cy="52" r="3" fill="#C05A38" opacity="0.45"/>
    <circle cx="135" cy="32" r="2" fill="#7A9A6E" opacity="0.45"/>
    <circle cx="170" cy="80" r="2.5" fill="#C9A96E" opacity="0.35"/>
  </svg>
);

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trend-detection', label: 'Trending',  icon: TrendingUp },
  { to: '/trends',    label: 'Campaigns', icon: Zap },
  { to: '/studio',    label: 'GrowthMaps', icon: Zap },
  { to: '/analytics', label: 'Analytics',  icon: BarChart2 },
  { to: '/strategy',  label: 'Archive',    icon: Archive },
];

const bottomTabs = [
  { to: '/dashboard', label: 'Home',      icon: LayoutDashboard },
  { to: '/trend-detection',  label: 'Trending',  icon: TrendingUp },
  { to: '/trends',    label: 'Campaigns', icon: Zap },
  { to: '/studio',    label: 'GrowthMaps',icon: Zap },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/settings',  label: 'Settings',  icon: Settings },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ minHeight: '100vh', background: '#EDE8DF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ══════════════ DESKTOP NAVBAR ══════════════ */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 58,
        background: '#EDE8DF',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(221,214,202,0.5)',
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ fontWeight: 800, fontSize: 17, color: '#2B2218', textDecoration: 'none', letterSpacing: '-0.5px', flexShrink: 0 }}>
          ViralPulse <span style={{ color: '#C05A38' }}>AI</span>
        </Link>

        {/* Center nav — hidden on mobile */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              style={{
                padding: '6px 14px', borderRadius: 999,
                fontSize: 14, fontWeight: isActive(to) ? 600 : 400,
                color: isActive(to) ? '#C05A38' : '#2B2218',
                textDecoration: isActive(to) ? 'underline' : 'none',
                textUnderlineOffset: 4,
                background: 'transparent',
                transition: 'color 150ms',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.color = '#C05A38'; }}
              onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = '#2B2218'; }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions — hidden on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="desktop-actions">
          {/* AddBlock */}
          <button style={{
            padding: '7px 16px', borderRadius: 999,
            border: '1.5px solid #DDD6CA', background: '#FAF7F2',
            fontSize: 13, fontWeight: 500, color: '#2B2218',
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 150ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#E8E0D4'}
            onMouseLeave={e => e.currentTarget.style.background = '#FAF7F2'}>
            <Plus size={14}/> AddBlock
          </button>

          {/* Set Automation */}
          <button style={{
            padding: '8px 18px', borderRadius: 999,
            background: '#C05A38', color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 150ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#A8442A'}
            onMouseLeave={e => e.currentTarget.style.background = '#C05A38'}>
            <SlidersHorizontal size={14}/> Set Automation
          </button>

          {/* Bell */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7068', padding: 6, display: 'flex', alignItems: 'center', borderRadius: '50%', transition: 'background 150ms' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E8E0D4'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <Bell size={18}/>
          </button>

          {/* Profile Container (Replaces standalone Settings button) */}
          <Link to="/settings" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 8px', borderRadius: 999,
            textDecoration: 'none', transition: 'background 150ms',
            background: isActive('/settings') ? '#E8E0D4' : 'transparent',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#E8E0D4'}
            onMouseLeave={e => e.currentTarget.style.background = isActive('/settings') ? '#E8E0D4' : 'transparent'}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #C05A38, #7A9A6E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>PS</div>
            <ChevronDown size={14} style={{ color: '#7A7068' }}/>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2B2218', padding: 6, display: 'none', alignItems: 'center' }}>
          {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {/* ══════════════ MOBILE DROPDOWN MENU ══════════════ */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, paddingTop: 58, background: 'rgba(43,34,24,0.35)' }}
          onClick={() => setMobileOpen(false)}>
          <div style={{ background: '#FAF7F2', margin: '8px 12px', borderRadius: 18, padding: '8px 0', boxShadow: '0 8px 32px rgba(43,34,24,0.15)' }}
            onClick={e => e.stopPropagation()}>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 20px', fontSize: 14, fontWeight: isActive(to) ? 600 : 400,
                  color: isActive(to) ? '#C05A38' : '#2B2218',
                  textDecoration: 'none', background: isActive(to) ? '#FEF0EA' : 'transparent',
                  transition: 'background 150ms',
                }}>
                <Icon size={16} style={{ color: isActive(to) ? '#C05A38' : '#7A7068' }}/>
                {label}
              </Link>
            ))}
            <div style={{ margin: '8px 12px', paddingTop: 8, borderTop: '1px solid #E8E0D4', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 999, border: '1.5px solid #DDD6CA', background: '#F0EBE3', fontSize: 13, fontWeight: 500, color: '#2B2218', cursor: 'pointer', fontFamily: 'inherit' }}>
                <Plus size={13} style={{ display: 'inline', marginRight: 4 }}/> AddBlock
              </button>
              <button style={{ flex: 1, padding: '10px', borderRadius: 999, background: '#C05A38', border: 'none', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                Set Automation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <main style={{ position: 'relative', overflow: 'hidden', paddingBottom: 80 }}>
        <BotanicalTR />
        {children}
      </main>

      {/* ══════════════ MOBILE BOTTOM TAB BAR ══════════════ */}
      <nav className="mobile-tab-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        display: 'none', alignItems: 'center', justifyContent: 'space-around',
        padding: '8px 4px 12px',
        background: '#FAF7F2',
        borderTop: '1px solid #DDD6CA',
      }}>
        {bottomTabs.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link key={to} to={to}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none', color: active ? '#C05A38' : '#B0A89C', padding: '4px 8px' }}>
              <Icon size={21}/>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <footer style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 52,
        borderTop: '1px solid #DDD6CA',
        background: '#EDE8DF',
      }}>
        <span style={{ fontSize: 11, color: '#B0A89C', letterSpacing: '0.06em', fontWeight: 500 }}>
          © 2024 VIRALPULSE AI. CULTIVATED FOR GROWTH.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['PRIVACY','TERMS','SUPPORT'].map(l => (
            <a key={l} href="#"
              style={{ fontSize: 11, fontWeight: 600, color: '#7A7068', textDecoration: 'none', letterSpacing: '0.06em' }}
              onMouseEnter={e => e.target.style.color = '#C05A38'}
              onMouseLeave={e => e.target.style.color = '#7A7068'}>
              {l}
            </a>
          ))}
        </div>
      </footer>

      {/* ══════════════ RESPONSIVE STYLES ══════════════ */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-tab-bar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-tab-bar { display: none !important; }
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
