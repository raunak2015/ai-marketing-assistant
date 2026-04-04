import { useState, useEffect } from 'react';
import { Sparkles, Copy, RefreshCw, Video, Hash, MessageSquareText, CheckCircle } from 'lucide-react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ContentSkeleton } from '../components/SkeletonLoader';

const PLATFORMS = ['Instagram', 'YouTube', 'LinkedIn', 'Twitter'];
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
  const [goal, setGoal] = useState('Viral Reach');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Enter to generate content
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading && topic.trim()) {
        e.preventDefault();
        generate();
      }
      // Escape to clear all
      if (e.key === 'Escape' && output) {
        e.preventDefault();
        clearAll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [loading, topic, output]);

  const generate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or description for your content.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.generateContent(topic.trim(), platform, goal);

      if (result.success && result.data) {
        setOutput({
          hooks: result.data.hooks || [],
          captions: result.data.captions || [],
          hashtags: result.data.hashtags || []
        });
        setRetryCount(0);

        // Show success toast
        if (window.showToast) {
          window.showToast('Content generated successfully!', 'success');
        }
      } else {
        throw new Error(result.message || 'Generation failed');
      }
    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage = err.message?.includes('fetch')
        ? 'Connection failed. Please check your internet and try again.'
        : err.message || 'AI service is temporarily unavailable. Please try again.';

      setError(errorMessage);
      setOutput(null);

      // Show error toast
      if (window.showToast) {
        window.showToast(errorMessage, 'error', 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);

      // Show copy success toast
      if (window.showToast) {
        window.showToast('Copied to clipboard!', 'success', 2000);
      }

      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      if (window.showToast) {
        window.showToast('Failed to copy. Please try again.', 'error');
      }
    }
  };

  const retry = () => {
    setRetryCount(prev => prev + 1);
    generate();
  };

  const clearAll = () => {
    setOutput(null);
    setError(null);
    setTopic('');
    setPlatform('Instagram');
    setGoal('Viral Reach');
    setRetryCount(0);
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
          {output && (
            <button
              onClick={clearAll}
              style={{
                ...pill(false),
                padding: '8px 18px',
                border: '1px solid #E8E0D4',
                background: '#fff',
                color: '#7A7068'
              }}
              onMouseEnter={(e) => e.target.style.background = '#F5F2EE'}
              onMouseLeave={(e) => e.target.style.background = '#fff'}
            >
              Clear All
            </button>
          )}
          <button style={{ ...pill(false), padding: '8px 18px' }}>Drafts</button>
          <button style={{ ...pill(false), padding: '8px 18px' }}>Templates</button>
        </div>
      </div>

      {/* Error display with retry */}
      {error && (
        <div style={{
          background: '#FEE8DC',
          color: '#C05A38',
          padding: '16px 20px',
          borderRadius: 12,
          marginBottom: 20,
          border: '1px solid #F5D4C7',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>⚠️ {error}</div>
            {retryCount < 3 && (
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Try regenerating or check your connection.
              </div>
            )}
          </div>
          {retryCount < 3 && (
            <button
              onClick={retry}
              disabled={loading}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                background: '#C05A38',
                color: '#fff',
                border: 'none',
                fontSize: 12,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'Retrying...' : 'Retry'}
            </button>
          )}
        </div>
      )}

      {/* 2-col layout */}
      <div className="cs-grid">
        {/* LEFT control panel */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 12px' }}>PLATFORM</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  tabIndex={0}
                  role="radio"
                  aria-checked={platform === p}
                  aria-label={`Select ${p} platform`}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPlatform(p);
                    }
                  }}
                  style={pill(platform === p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#B0A89C', letterSpacing: '0.14em', margin: '0 0 12px' }}>GOAL</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GOALS.map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  tabIndex={0}
                  role="radio"
                  aria-checked={goal === g}
                  aria-label={`Select ${g} goal`}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setGoal(g);
                    }
                  }}
                  style={pill(goal === g, '#C9A96E')}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: '#B0A89C',
                letterSpacing: '0.14em',
                margin: '0 0 12px',
                display: 'block'
              }}
            >
              TOPIC OR DESCRIPTION
            </label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="What is your content about? Describe your idea, hook, or reel concept…"
              rows={7}
              maxLength={500}
              aria-label="Content topic or description"
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1.5px solid #E8E0D4',
                background: '#F5F2EE',
                padding: '14px',
                fontSize: 13,
                color: '#2B2218',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.6,
                boxSizing: 'border-box',
                transition: 'border 150ms',
              }}
              onFocus={e => e.target.style.border = '1.5px solid #C05A38'}
              onBlur={e => e.target.style.border = '1.5px solid #E8E0D4'}
            />
            <div style={{
              fontSize: 11,
              color: topic.length > 450 ? '#C05A38' : '#B0A89C',
              marginTop: 6,
              textAlign: 'right',
              fontWeight: topic.length > 450 ? 600 : 400
            }}>
              {topic.length}/500
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            aria-label={loading ? "Generating content, please wait" : "Generate optimized content for your topic"}
            style={{
              width: '100%', padding: '14px', borderRadius: 999,
              background: loading || !topic.trim() ? '#B0A89C' : '#C05A38',
              color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
              cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'background 150ms',
            }}
          >
            {loading
              ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating…</>
              : <><Sparkles size={16} /> Optimize Content</>
            }
          </button>
          <div style={{
            fontSize: 11,
            color: '#B0A89C',
            textAlign: 'center',
            marginTop: 8,
            opacity: 0.7
          }}>
            Press Ctrl+Enter to generate • Esc to clear
          </div>
        </Card>

        {/* RIGHT output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {output ? (
            <>
              {/* Viral Hooks */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Video size={16} style={{ color: '#C05A38' }} />
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
                        <Copy size={13} style={{ color: copied === `hook-${i}` ? '#7A9A6E' : '#7A7068' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Captions */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <MessageSquareText size={16} style={{ color: '#C9A96E' }} />
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2B2218', margin: 0 }}>Optimized Captions</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {output.captions.map((cap, i) => (
                    <div key={i} style={{ position: 'relative', background: '#F5F2EE', borderRadius: 12, padding: '14px' }}>
                      <p style={{ fontSize: 13, color: '#2B2218', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap', paddingRight: 36 }}>{cap}</p>
                      <button onClick={() => copy(cap, `cap-${i}`)}
                        style={{ position: 'absolute', top: 12, right: 12, background: '#fff', border: '1px solid #E8E0D4', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}>
                        <Copy size={13} style={{ color: copied === `cap-${i}` ? '#7A9A6E' : '#7A7068' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Hashtags */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <Hash size={16} style={{ color: '#7A9A6E' }} />
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
                <Sparkles size={28} style={{ color: '#C05A38' }} />
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