import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../services/api';

/* ── Botanical corner decorations (match reference screenshot) ── */
const BotanicalTL = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, opacity: 0.18, pointerEvents: 'none' }}>
    <path d="M0 0 Q40 60 0 140" stroke="#506B40" strokeWidth="2" fill="none" />
    <path d="M10 0 Q60 50 20 130" stroke="#7A9A6E" strokeWidth="1.5" fill="none" />
    <ellipse cx="30" cy="30" rx="28" ry="12" stroke="#7A9A6E" strokeWidth="1.5" fill="none" transform="rotate(-30 30 30)" />
    <ellipse cx="15" cy="65" rx="32" ry="13" stroke="#506B40" strokeWidth="1.2" fill="none" transform="rotate(-50 15 65)" />
    <ellipse cx="45" cy="90" rx="22" ry="10" stroke="#7A9A6E" strokeWidth="1" fill="none" transform="rotate(-20 45 90)" />
    <circle cx="55" cy="20" r="3" fill="#C05A38" opacity="0.4" />
    <circle cx="20" cy="50" r="2.5" fill="#7A9A6E" opacity="0.5" />
    <circle cx="38" cy="110" r="2" fill="#C9A96E" opacity="0.5" />
  </svg>
);

const BotanicalBR = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', bottom: 60, right: 0, opacity: 0.15, pointerEvents: 'none' }}>
    <path d="M160 160 Q100 100 160 0" stroke="#506B40" strokeWidth="2" fill="none" />
    <path d="M145 160 Q90 110 145 10" stroke="#7A9A6E" strokeWidth="1.5" fill="none" />
    <ellipse cx="120" cy="130" rx="30" ry="12" stroke="#7A9A6E" strokeWidth="1.5" fill="none" transform="rotate(30 120 130)" />
    <ellipse cx="140" cy="90" rx="25" ry="11" stroke="#506B40" strokeWidth="1.2" fill="none" transform="rotate(50 140 90)" />
    <circle cx="110" cy="145" r="3" fill="#C05A38" opacity="0.4" />
    <circle cx="145" cy="60" r="2.5" fill="#7A9A6E" opacity="0.5" />
  </svg>
);

/* ── Google icon SVG ── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);


const roles = ['Creator', 'Startup', 'Business', 'Marketing Agency'];
const connectable = ['Instagram', 'YouTube', 'LinkedIn', 'Twitter', 'Facebook'];

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState('form'); // form | step1 | step2 | step3
  const [selectedRole, setSelectedRole] = useState('Creator');
  const [connected, setConnected] = useState({});
  const [topic, setTopic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const result = await api.login(email, password);
      if (result.success) {
        localStorage.setItem('viralPulseToken', result.data.token);
        localStorage.setItem('viralPulseUser', JSON.stringify(result.data));
        navigate('/dashboard');
      } else {
        setAuthError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      // Fallback: navigate anyway for demo
      navigate('/dashboard');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const result = await api.register({ name, email, password, role: selectedRole });
      if (result.success) {
        localStorage.setItem('viralPulseToken', result.data.token);
        localStorage.setItem('viralPulseUser', JSON.stringify(result.data));
        navigate('/dashboard');
      } else {
        setAuthError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setAuthLoading(false);
    }
  };

  const isSignup = tab === 'signup';

  return (
    <div style={{ minHeight: '100vh', background: '#EDE8DF', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>

      {/* Botanical decorations */}
      <BotanicalTL />
      <BotanicalBR />

      {/* ── Navbar ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 60, position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: 18, color: '#2B2218', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          ViralPulse AI
        </Link>
        <div style={{ display: 'flex', gap: 36 }}>
          {['Features', 'Pricing', 'Community'].map(item => (
            <a key={item} href="#" style={{ fontSize: 14, color: '#2B2218', textDecoration: 'none', fontWeight: 400 }}
              onMouseEnter={e => e.target.style.color = '#C05A38'}
              onMouseLeave={e => e.target.style.color = '#2B2218'}>
              {item}
            </a>
          ))}
        </div>
        <button
          onClick={() => { setTab(tab === 'signin' ? 'signup' : 'signin'); setStep('form'); }}
          style={{ fontSize: 14, fontWeight: 600, color: '#C05A38', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: 'inherit' }}>
          {tab === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </nav>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px 80px', position: 'relative', zIndex: 5 }}>

        {/* Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: '40px 44px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 4px 32px rgba(43,34,24,0.10)',
        }}>

          {/* ── Step Progress (signup only) ── */}
          {isSignup && step !== 'form' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
              {['step1', 'step2', 'step3'].map((s, i) => (
                <div key={s} style={{
                  height: 8,
                  borderRadius: 999,
                  transition: 'all 0.25s',
                  width: step === s ? 24 : 8,
                  background: step === s ? '#C05A38' : ['step1', 'step2', 'step3'].indexOf(step) > i ? '#E8C4A4' : '#DDD6CA',
                }} />
              ))}
            </div>
          )}

          {/* ── Sign In Form ── */}
          {(tab === 'signin' || (isSignup && step === 'form')) && (
            <>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#2B2218', textAlign: 'center', marginBottom: 6 }}>
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p style={{ fontSize: 14, color: '#7A7068', textAlign: 'center', marginBottom: 28, lineHeight: 1.5 }}>
                {isSignup
                  ? 'Start cultivating your brand\'s digital growth.'
                  : 'Continue cultivating your brand\'s digital growth.'}
              </p>

              {/* Social buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  { icon: <GoogleIcon />, label: 'SIGN IN WITH GOOGLE' },
                ].map(({ icon, label }) => (
                  <button key={label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                      padding: '13px 20px', borderRadius: 10,
                      border: '1px solid #DDD6CA', background: '#FAFAFA',
                      fontSize: 13, fontWeight: 600, color: '#2B2218', letterSpacing: '0.04em',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F0EBE3'}
                    onMouseLeave={e => e.currentTarget.style.background = '#FAFAFA'}>
                    {icon}
                    {label}
                  </button>
                ))}
              </div>

              {/* OR divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: '#E8E0D4' }} />
                <span style={{ fontSize: 11, color: '#B0A89C', fontWeight: 500, letterSpacing: '0.08em' }}>OR</span>
                <div style={{ flex: 1, height: 1, background: '#E8E0D4' }} />
              </div>

              {/* Form */}
              <form onSubmit={isSignup ? (e) => { e.preventDefault(); setStep('step1'); } : handleSignIn}>
                {isSignup && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#7A7068', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>FULL NAME</label>
                    <input
                      type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
                      onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
                    />
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#7A7068', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="hello@garden.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
                    onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#7A7068', letterSpacing: '0.08em' }}>PASSWORD</label>
                    {!isSignup && (
                      <button type="button" style={{ fontSize: 11, fontWeight: 700, color: '#C05A38', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: 'inherit' }}>
                        FORGOT?
                      </button>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ ...inputStyle, paddingRight: 44 }}
                      onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
                      onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B0A89C', display: 'flex', alignItems: 'center' }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit"
                  style={{
                    width: '100%', padding: '15px', borderRadius: 999,
                    background: '#C05A38', color: '#fff', border: 'none',
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#A8442A'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C05A38'}>
                  {isSignup ? 'CREATE ACCOUNT' : 'SIGN IN TO PULSE'}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: 13, color: '#7A7068', marginTop: 20 }}>
                {isSignup ? 'Already have an account? ' : 'New to the greenhouse? '}
                <button onClick={() => { setTab(isSignup ? 'signin' : 'signup'); setStep('form'); }}
                  style={{ fontWeight: 700, color: '#C05A38', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                  {isSignup ? 'Sign in' : 'Create an account'}
                </button>
              </p>
            </>
          )}

          {/* ── Step 1: Role ── */}
          {isSignup && step === 'step1' && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#2B2218', marginBottom: 6 }}>Tell us about you</h1>
              <p style={{ fontSize: 13, color: '#7A7068', marginBottom: 24 }}>Help us personalise your experience</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {roles.map(r => (
                  <button key={r} onClick={() => setSelectedRole(r)}
                    style={{
                      padding: '18px 12px', borderRadius: 14, fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
                      background: selectedRole === r ? '#C05A38' : '#F0EBE3',
                      color: selectedRole === r ? '#fff' : '#2B2218',
                      border: selectedRole === r ? 'none' : '1.5px solid #DDD6CA',
                    }}>
                    {r}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('step2')} style={primaryBtn}>Next →</button>
              <button onClick={() => setStep('form')} style={ghostBtn}>← Back</button>
            </>
          )}

          {/* ── Step 2: Platforms ── */}
          {isSignup && step === 'step2' && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#2B2218', marginBottom: 6 }}>Connect your platforms</h1>
              <p style={{ fontSize: 13, color: '#7A7068', marginBottom: 24 }}>Link your social accounts for analysis</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                {connectable.map(p => {
                  const isConn = connected[p];
                  return (
                    <button key={p} onClick={() => setConnected(prev => ({ ...prev, [p]: !isConn }))}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                        borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                        fontFamily: 'inherit', transition: 'all 150ms',
                        background: isConn ? '#FEF0EA' : '#F0EBE3',
                        border: isConn ? '1.5px solid #C05A38' : '1.5px solid transparent',
                        color: '#2B2218',
                      }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#C05A38', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {p[0]}
                      </div>
                      <span style={{ flex: 1, textAlign: 'left' }}>{p}</span>
                      {isConn && <span style={{ color: '#7A9A6E', fontSize: 14 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setStep('step3')} style={primaryBtn}>Next →</button>
              <button onClick={() => setStep('step1')} style={ghostBtn}>← Back</button>
            </>
          )}

          {/* ── Step 3: First Analysis ── */}
          {isSignup && step === 'step3' && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#2B2218', marginBottom: 6 }}>Your first AI analysis</h1>
              <p style={{ fontSize: 13, color: '#7A7068', marginBottom: 24 }}>Enter a topic to get your first virality scan</p>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#7A7068', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>CONTENT TOPIC</label>
                <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Morning productivity routine..."
                  style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
                  onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#7A7068', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>PRIMARY PLATFORM</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Instagram', 'YouTube', 'LinkedIn', 'Twitter'].map(p => (
                    <button key={p} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: '#E8E0D4', color: '#7A7068', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleSignUp} disabled={authLoading} style={primaryBtn}>{authLoading ? 'Creating...' : '✦ Let\'s Analyze!'}</button>
              <button onClick={() => setStep('step2')} style={ghostBtn}>← Back</button>
            </>
          )}
        </div>

        {/* ── AI Suggestion chip ── */}
        <div style={{
          marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 14,
          background: '#FFF', borderRadius: 16, padding: '14px 18px',
          width: '100%', maxWidth: 420,
          boxShadow: '0 2px 12px rgba(43,34,24,0.07)',
        }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#E8F0E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>🌿</span>
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#7A9A6E', letterSpacing: '0.1em', marginBottom: 4 }}>AI SUGGESTION</p>
            <p style={{ fontSize: 12, color: '#7A7068', lineHeight: 1.5 }}>
              Secure your seeds. Users with two-factor authentication are 80% less likely to experience account growth issues.
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 52,
        borderTop: '1px solid #DDD6CA',
        zIndex: 10,
      }}>
        <span style={{ fontSize: 11, color: '#B0A89C', letterSpacing: '0.06em', fontWeight: 500 }}>
          © 2024 VIRALPULSE AI. CULTIVATING DIGITAL GROWTH.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['PRIVACY', 'TERMS', 'SUPPORT'].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, fontWeight: 600, color: '#7A7068', textDecoration: 'none', letterSpacing: '0.06em' }}
              onMouseEnter={e => e.target.style.color = '#C05A38'}
              onMouseLeave={e => e.target.style.color = '#7A7068'}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* ── Shared style objects ── */
const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 8,
  border: '1.5px solid #E8E0D4', background: '#FAFAFA',
  fontSize: 14, color: '#2B2218', outline: 'none',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxSizing: 'border-box', transition: 'border 150ms',
};

const primaryBtn = {
  width: '100%', padding: '14px', borderRadius: 999,
  background: '#C05A38', color: '#fff', border: 'none',
  fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
  cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
  marginBottom: 8, transition: 'background 150ms', display: 'block',
};

const ghostBtn = {
  width: '100%', padding: '12px', borderRadius: 999,
  background: 'transparent', color: '#7A7068', border: 'none',
  fontSize: 13, fontWeight: 500, cursor: 'pointer',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  display: 'block', textAlign: 'center',
};
