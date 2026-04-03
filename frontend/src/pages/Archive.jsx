import { useState, useMemo } from 'react';
import {
  Calendar, List, Plus, ChevronLeft, ChevronRight,
  Clock, Edit3, Trash2, X, Check, FileText, AlertCircle,
  CheckCircle, Star, Eye, Heart, Share2, MessageCircle, Zap
} from 'lucide-react';

/* ─── INLINE BRAND ICONS ─── */
const IgIcon = ({ size = 18, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
  </svg>
);
const YtIcon = ({ size = 18, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} stroke="none"/>
  </svg>
);
const LiIcon = ({ size = 18, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwIcon = ({ size = 18, color = 'currentColor', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.5 4.5 0 0 0-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.48 4.48 0 0 1-2.05-.56v.06c0 2.19 1.56 4.02 3.63 4.43a4.5 4.5 0 0 1-2.04.08c.57 1.79 2.24 3.09 4.22 3.12A9.06 9.06 0 0 1 0 19.54 12.8 12.8 0 0 0 6.92 21.5c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58A9.16 9.16 0 0 0 23 3z"/>
  </svg>
);

/* ─── PLATFORM CONFIG ─── */
const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: '#C05A38', bg: '#F3E5DF', Icon: IgIcon },
  { id: 'youtube',   label: 'YouTube',   color: '#A8442A', bg: '#FAECE9', Icon: YtIcon },
  { id: 'linkedin',  label: 'LinkedIn',  color: '#7A9A6E', bg: '#E9EFEB', Icon: LiIcon },
  { id: 'twitter',   label: 'Twitter',   color: '#506B40', bg: '#E4EBDF', Icon: TwIcon },
];

const STATUS_OPTIONS = ['Scheduled', 'Published', 'Failed', 'Draft'];
const STATUS_META = {
  Scheduled: { color: '#C9A96E', bg: '#FDF4E3', Icon: Clock        },
  Published:  { color: '#7A9A6E', bg: '#E9EFEB', Icon: CheckCircle  },
  Failed:     { color: '#C05A38', bg: '#F3E5DF', Icon: AlertCircle  },
  Draft:      { color: '#B0A89C', bg: '#F0EBE3', Icon: FileText     },
};

const CONTENT_TYPES = ['Post', 'Reel', 'Story', 'Video', 'Article', 'Thread'];

/* ─── INITIAL DEMO DATA ─── */
const INITIAL_SCHEDULES = [
  {
    id: 1,
    title: 'Spring Collection Launch 🌸',
    platform: 'instagram',
    status: 'Scheduled',
    date: '2026-04-05',
    time: '10:00',
    contentType: 'Reel',
    caption: 'Introducing our vibrant spring collection — bold colors, sustainable fabrics. Shop the link in bio!',
    hashtags: '#spring #fashion #sustainable #newcollection',
    stats: { views: 0, likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 2,
    title: 'Behind the Scenes Vlog 🎬',
    platform: 'youtube',
    status: 'Published',
    date: '2026-04-02',
    time: '14:00',
    contentType: 'Video',
    caption: 'Take a tour of our studio and meet the team behind the brand.',
    hashtags: '#behindthescenes #vlog #brand',
    stats: { views: 12400, likes: 890, shares: 145, comments: 67 },
  },
  {
    id: 3,
    title: 'Industry Thought Leadership',
    platform: 'linkedin',
    status: 'Draft',
    date: '2026-04-07',
    time: '09:00',
    contentType: 'Article',
    caption: 'How AI is transforming content marketing in 2026 — key insights from our research.',
    hashtags: '#AI #marketing #contentStrategy',
    stats: { views: 0, likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 4,
    title: 'Product Drop Announcement',
    platform: 'twitter',
    status: 'Scheduled',
    date: '2026-04-09',
    time: '12:00',
    contentType: 'Thread',
    caption: 'Big announcement dropping tomorrow 👀 Stay tuned.',
    hashtags: '#productdrop #launch',
    stats: { views: 0, likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 5,
    title: 'Weekly Tip: Hook Writing',
    platform: 'instagram',
    status: 'Scheduled',
    date: '2026-04-12',
    time: '11:00',
    contentType: 'Post',
    caption: '5 proven hooks that stop the scroll every time. Save this for later!',
    hashtags: '#contentcreation #marketingtips #hooks',
    stats: { views: 0, likes: 0, shares: 0, comments: 0 },
  },
];

const OPTIMAL_DAYS = [2, 5, 9, 12, 16, 19, 23, 26]; // days of month

/* ─── HELPERS ─── */
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const formatDateKey = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const todayStr = () => {
  const t = new Date();
  return formatDateKey(t.getFullYear(), t.getMonth(), t.getDate());
};
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

/* ─── EMPTY FORM ─── */
const emptyForm = () => ({
  title: '', platform: 'instagram', status: 'Scheduled',
  date: '', time: '10:00', contentType: 'Post', caption: '', hashtags: '',
});

/* ══════════════════════════════════════════════════════ */
export default function Schedule() {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'list'
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3); // 0-indexed → April
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = add mode
  const [form, setForm] = useState(emptyForm());
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* ── Stats summary ── */
  const stats = useMemo(() => ({
    Scheduled: schedules.filter(s => s.status === 'Scheduled').length,
    Published:  schedules.filter(s => s.status === 'Published').length,
    Failed:     schedules.filter(s => s.status === 'Failed').length,
    Draft:      schedules.filter(s => s.status === 'Draft').length,
  }), [schedules]);

  /* ── Calendar data ── */
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const schedulesByDate = useMemo(() => {
    const map = {};
    schedules.forEach(s => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [schedules]);

  /* ── Handlers ── */
  const openAdd = (dateStr = '') => {
    setEditingItem(null);
    setForm({ ...emptyForm(), date: dateStr });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title, platform: item.platform, status: item.status,
      date: item.date, time: item.time, contentType: item.contentType,
      caption: item.caption, hashtags: item.hashtags,
    });
    setShowModal(true);
  };

  const saveSchedule = () => {
    if (!form.title.trim() || !form.date) return;
    if (editingItem) {
      setSchedules(prev => prev.map(s =>
        s.id === editingItem.id ? { ...s, ...form } : s
      ));
    } else {
      const newItem = { ...form, id: Date.now(), stats: { views: 0, likes: 0, shares: 0, comments: 0 } };
      setSchedules(prev => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const getPlatform = (id) => PLATFORMS.find(p => p.id === id) || PLATFORMS[0];
  const today = todayStr();

  /* ════════════════════════════════════ RENDER ══ */
  return (
    <div style={{ padding: '32px 36px 60px', fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box' }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3E5DF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} color="#C05A38" strokeWidth={2.5} />
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#2B2218', letterSpacing: '-0.5px' }}>
              Content Schedule
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#7A7068' }}>Plan and manage your cross-platform posting strategy</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', background: '#F0EBE3', borderRadius: 999, padding: 3, border: '1px solid #E8E0D4' }}>
            {[{ mode: 'calendar', Icon: Calendar, label: 'Calendar' }, { mode: 'list', Icon: List, label: 'List' }].map(({ mode, Icon, label }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, transition: 'all 150ms',
                background: viewMode === mode ? '#FAF7F2' : 'transparent',
                color: viewMode === mode ? '#2B2218' : '#7A7068',
                boxShadow: viewMode === mode ? '0 2px 8px rgba(43,34,24,0.08)' : 'none',
              }}>
                <Icon size={14} />{label}
              </button>
            ))}
          </div>
          {/* Add Button */}
          <button onClick={() => openAdd()} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 20px', borderRadius: 999,
            background: '#C05A38', color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(192,90,56,0.3)',
            transition: 'all 150ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#A8442A'}
            onMouseLeave={e => e.currentTarget.style.background = '#C05A38'}
          >
            <Plus size={16} /> Schedule Post
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {Object.entries(stats).map(([status, count]) => {
          const { color, bg, Icon } = STATUS_META[status];
          return (
            <div key={status} style={{
              background: '#FAF9F6', border: '1px solid #EAE4DC', borderRadius: 16,
              padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 2px 10px rgba(43,34,24,0.03)',
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={color} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#B0A89C', fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em' }}>{status}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#2B2218', lineHeight: 1 }}>{count}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main Panel ── */}
      <div style={{ background: '#FAF9F6', border: '1px solid #EAE4DC', borderRadius: 20, boxShadow: '0 4px 20px rgba(43,34,24,0.04)', overflow: 'hidden' }}>

        {/* ─── CALENDAR VIEW ─── */}
        {viewMode === 'calendar' && (
          <div style={{ padding: '24px 28px 28px' }}>
            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#2B2218' }}>
                {MONTH_NAMES[month]} {year}
              </h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ Icon: ChevronLeft, fn: prevMonth }, { Icon: ChevronRight, fn: nextMonth }].map(({ Icon, fn }, i) => (
                  <button key={i} onClick={fn} style={{
                    width: 30, height: 30, borderRadius: '50%', border: '1px solid #E8E0D4',
                    background: '#F0EBE3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B2218',
                    transition: 'background 150ms',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E8E0D4'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F0EBE3'}
                  ><Icon size={15} /></button>
                ))}
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 }}>
              {DAY_NAMES.map((d, i) => (
                <div key={d} style={{
                  textAlign: 'center', fontSize: 11, fontWeight: 700,
                  color: i === 0 || i === 6 ? '#C9A96E' : '#B0A89C',
                  letterSpacing: '0.08em', paddingBottom: 4,
                }}>{d}</div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>

              {/* Leading empty cells — shown with faint border */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e${i}`} />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateKey = formatDateKey(year, month, day);
                const daySchedules = schedulesByDate[dateKey] || [];
                const isToday = dateKey === today;
                const isOptimal = OPTIMAL_DAYS.includes(day);
                const hasSchedules = daySchedules.length > 0;

                // Determine dominant status for border color
                const hasPublished = daySchedules.some(s => s.status === 'Published');
                const hasFailed    = daySchedules.some(s => s.status === 'Failed');
                const hasScheduled = daySchedules.some(s => s.status === 'Scheduled');
                const hasDraft     = daySchedules.some(s => s.status === 'Draft');

                // Cell background + border based on status priority
                let cellBg          = '#FAFAF8';
                let cellBorder      = '1.5px solid #CFCAC3';
                let hoverBorderColor = '#C8C0B6';
                if (isToday) {
                  cellBg           = '#FEF4EC';
                  cellBorder       = '1.5px solid #D4845A';
                  hoverBorderColor = '#E8A888';
                } else if (hasSchedules) {
                  if (hasFailed)         { cellBg = '#FEF0F0'; cellBorder = '5px solid #9d0404ff'; hoverBorderColor = '#ed6262ff'; }
                  else if (hasPublished) { cellBg = '#EEF7EE'; cellBorder = '1.5px solid #41af55ff'; hoverBorderColor = '#88f099ff'; }
                  else if (hasScheduled) { cellBg = '#FEF8EC'; cellBorder = '1.5px solid #dcb354ff'; hoverBorderColor = '#f0c266ff'; }
                  else if (hasDraft)     { cellBg = '#F5F3F0'; cellBorder = '1.5px solid #B0A89C'; hoverBorderColor = '#efdac6ff'; }
                }

                // Status dot color per schedule
                const dotColor = (status) => {
                  if (status === 'Published') return '#5FAD6B';
                  if (status === 'Failed')    return '#D94F4F';
                  if (status === 'Scheduled') return '#C9A96E';
                  return '#C0B8B0'; // Draft
                };

                return (
                  <div key={day}
                    onClick={() => {
                      if (hasSchedules) {
                        // If already selected, open add modal on second click
                        if (selectedDate === dateKey) {
                          openAdd(dateKey);
                        } else {
                          setSelectedDate(dateKey);
                        }
                      } else {
                        openAdd(dateKey);
                      }
                    }}
                    style={{
                      minHeight: 68, borderRadius: 10, padding: '7px 9px 7px',
                      border: cellBorder,
                      background: cellBg,
                      cursor: 'pointer',
                      transition: 'border-color 150ms',
                      boxSizing: 'border-box',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = hoverBorderColor;
                      e.currentTarget.style.borderWidth = '2.5px';
                    }}
                    onMouseLeave={e => {
                      const orig = cellBorder.split(' ').slice(2).join(' ');
                      e.currentTarget.style.borderColor = orig;
                      e.currentTarget.style.borderWidth = cellBorder.split(' ')[0].replace('px','') + 'px';
                    }}
                  >
                    {/* Date number + star */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{
                        fontSize: 13, fontWeight: isToday ? 800 : 500,
                        color: isToday ? '#C05A38' : '#2B2218',
                        lineHeight: 1,
                      }}>{day}</span>
                      {isOptimal && <Star size={9} color="#C9A96E" fill="#C9A96E" />}
                    </div>

                    {/* Status dots row */}
                    {hasSchedules && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 4 }}>
                        {daySchedules.slice(0, 4).map(s => (
                          <button key={s.id}
                            onClick={e => { e.stopPropagation(); setSelectedDate(dateKey); }}
                            title={s.title}
                            style={{
                              width: 9, height: 9, borderRadius: '50%',
                              background: dotColor(s.status),
                              border: 'none', cursor: 'pointer', padding: 0,
                              flexShrink: 0,
                              transition: 'transform 150ms',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.4)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        ))}
                        {daySchedules.length > 4 && (
                          <span style={{ fontSize: 9, color: '#B0A89C', fontWeight: 700 }}>+{daySchedules.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {(() => {
                const totalCells = firstDay + daysInMonth;
                const remainder = totalCells % 7;
                const trailing = remainder === 0 ? 0 : 7 - remainder;
                return Array.from({ length: trailing }).map((_, i) => (
                  <div key={`t${i}`} />
                ));
              })()}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, marginTop: 18, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7A7068' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C05A38', border: '2px solid #C05A38' }} />
                Today
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7A7068' }}>
                <Star size={10} color="#C9A96E" fill="#C9A96E" /> Optimal posting window
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7A7068' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#5FAD6B' }} /> Published
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7A7068' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#C9A96E' }} /> Scheduled
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7A7068' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#D94F4F' }} /> Failed
              </div>
            </div>
          </div>
        )}


        {/* ─── LIST VIEW ─── */}
        {viewMode === 'list' && (
          <div style={{ padding: '4px 0 8px' }}>
            {schedules.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px', color: '#B0A89C', fontSize: 14 }}>
                No schedules yet. Click <strong>+ Schedule Post</strong> to add one.
              </div>
            )}
            {[...schedules].sort((a, b) => a.date.localeCompare(b.date)).map((s, idx, arr) => {
              const plat = getPlatform(s.platform);
              const sm = STATUS_META[s.status];
              const isSelected = selectedDate === s.date;
              const isLast = idx === arr.length - 1;
              return (
                <div key={s.id}
                  className="list-row"
                  onClick={() => setSelectedDate(s.date)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 28px',
                    borderBottom: isLast ? 'none' : '1px solid #EEE9E2',
                    background: isSelected ? '#FEF5F0' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 120ms',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F7F3EF'; e.currentTarget.querySelector('.lra').style.opacity='1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSelected ? '#FEF5F0' : 'transparent'; e.currentTarget.querySelector('.lra').style.opacity='0'; }}
                >
                  {/* Selected accent bar */}
                  {isSelected && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#C05A38', borderRadius:'0 3px 3px 0' }} />}

                  {/* Platform icon */}
                  <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, background:plat.bg, display:'flex', alignItems:'center', justifyContent:'center', border:`1.5px solid ${plat.color}25` }}>
                    <plat.Icon size={19} color={plat.color} strokeWidth={2} />
                  </div>

                  {/* Title + meta */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#2B2218', marginBottom:5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {s.title}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:4, color:'#9A9088', fontSize:12 }}>
                        <Clock size={12} strokeWidth={2} />
                        <span>{s.date} · {s.time}</span>
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, padding:'2px 9px', borderRadius:999, background:plat.bg, color:plat.color }}>
                        {s.contentType}
                      </span>
                    </div>
                  </div>

                  {/* Edit/Delete buttons — appear on hover */}
                  <div className="lra" style={{ display:'flex', gap:2, opacity:0, transition:'opacity 150ms', flexShrink:0 }}>
                    <button onClick={e => { e.stopPropagation(); openEdit(s); }}
                      style={{ background:'none', border:'none', cursor:'pointer', color:'#B0A89C', padding:'6px', borderRadius:8, transition:'background 150ms' }}
                      onMouseEnter={e => e.currentTarget.style.background='#E8E0D4'}
                      onMouseLeave={e => e.currentTarget.style.background='none'}
                    ><Edit3 size={14} /></button>
                    <button onClick={e => { e.stopPropagation(); setDeleteConfirm(s.id); }}
                      style={{ background:'none', border:'none', cursor:'pointer', color:'#C05A38', padding:'6px', borderRadius:8, transition:'background 150ms' }}
                      onMouseEnter={e => e.currentTarget.style.background='#F3E5DF'}
                      onMouseLeave={e => e.currentTarget.style.background='none'}
                    ><Trash2 size={14} /></button>
                  </div>

                  {/* Status badge */}
                  <div style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 13px', borderRadius:999, background:sm.bg, border:`1px solid ${sm.color}25`, flexShrink:0 }}>
                    <sm.Icon size={12} color={sm.color} strokeWidth={2} />
                    <span style={{ fontSize:12, fontWeight:700, color:sm.color }}>{s.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* ── Schedule Detail Panel ── */}
      {selectedDate && (
        <DailyScheduleCard
          date={selectedDate}
          schedules={schedulesByDate[selectedDate] || []}
          onClose={() => setSelectedDate(null)}
          onEdit={openEdit}
          onAdd={() => openAdd(selectedDate)}
          onDelete={(id) => setDeleteConfirm(id)}
          getPlatform={getPlatform}
        />
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <ScheduleModal
          form={form}
          setForm={setForm}
          isEdit={!!editingItem}
          onSave={saveSchedule}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(43,34,24,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#FAF9F6', borderRadius: 20, padding: 32, maxWidth: 360, width: '90%', boxShadow: '0 20px 60px rgba(43,34,24,0.2)', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#F3E5DF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={22} color="#C05A38" />
            </div>
            <h3 style={{ margin: '0 0 8px', color: '#2B2218', fontSize: 18, fontWeight: 700 }}>Delete Schedule?</h3>
            <p style={{ color: '#7A7068', fontSize: 14, margin: '0 0 24px', lineHeight: 1.5 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', borderRadius: 999, border: '1.5px solid #E8E0D4', background: '#F0EBE3', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#2B2218' }}>Cancel</button>
              <button onClick={() => deleteSchedule(deleteConfirm)} style={{ flex: 1, padding: '11px', borderRadius: 999, border: 'none', background: '#C05A38', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .sched-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .sched-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCHEDULE DETAIL PANEL
══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   DAILY SCHEDULE CARD (Groups by Date)
   Replaces the previous single-item detail view.
══════════════════════════════════════════════════════ */
function DailyScheduleCard({ date, schedules, onClose, onEdit, onAdd, onDelete, getPlatform }) {
  // Format: "Monday, April 5, 2026"
  const formattedDate = useMemo(() => {
    if (!date) return '';
    const [y, m, d] = date.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, [date]);

  return (
    <div style={{
      marginTop: 24,
      background: '#FAF9F6',
      border: '1px solid #EAE4DC',
      borderRadius: 24,
      padding: '24px 28px',
      boxShadow: '0 10px 40px rgba(43,34,24,0.06)',
      animation: 'slideUp 0.3s ease-out',
      position: 'relative',
    }}>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      
      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 24, background: '#F0EBE3', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A7068', transition:'background 150ms' }} onMouseEnter={e=>e.currentTarget.style.background='#E8E0D4'} onMouseLeave={e=>e.currentTarget.style.background='#F0EBE3'}>
        <X size={18} />
      </button>

      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingRight: 40 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#C05A38', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Daily Schedule</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#2B2218' }}>{formattedDate}</h2>
        </div>
        <button onClick={onAdd} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 999,
          background: '#C05A38', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(192,90,56,0.25)',
          transition: 'all 200ms',
        }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(192,90,56,0.3)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(192,90,56,0.25)'; }}>
          <Plus size={16} /> Add Post
        </button>
      </div>

      {/* Schedules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {schedules.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#B0A89C', fontSize: 14, background: '#F7F4F0', borderRadius: 16, border: '1.5px dashed #E8E0D4' }}>
            No posts scheduled for this day.
          </div>
        ) : (
          schedules.map((s, idx) => {
            const plat = getPlatform(s.platform);
            const sm = STATUS_META[s.status];
            return (
              <div key={s.id} style={{
                background: '#fff',
                border: '1px solid #EEE9E2',
                borderRadius: 18,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                transition: 'all 200ms',
                boxShadow: '0 2px 8px rgba(43,34,24,0.02)',
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4845A'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(43,34,24,0.05)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#EEE9E2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(43,34,24,0.02)'; }}>
                
                {/* Platform Icon */}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: plat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${plat.color}15` }}>
                  <plat.Icon size={20} color={plat.color} strokeWidth={2.5} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#2B2218', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 6, background: sm.bg, border: `1px solid ${sm.color}15` }}>
                      <sm.Icon size={10} color={sm.color} strokeWidth={2.5} />
                      <span style={{ fontSize: 10, fontWeight: 700, color: sm.color, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{s.status}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#7A7068', fontSize: 13, fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={14} color="#B0A89C" /> {s.time}</div>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#E8E0D4' }} />
                    <div style={{ color: plat.color, fontWeight: 700, fontSize: 12 }}>{s.contentType}</div>
                  </div>
                </div>

                {/* Caption Snippet */}
                <div style={{ flex: 1.5, fontSize: 13, color: '#7A7068', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', padding: '0 20px', borderLeft: '1px solid #EEE9E2', maxHeight: 40, lineHeight: 1.5 }}>
                  {s.caption || 'No caption...'}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => onEdit(s)} style={{ width: 36, height: 36, borderRadius: 10, background: '#F0EBE3', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B2218', transition: 'all 150ms' }} onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = '#F0EBE3'; e.currentTarget.style.color = '#2B2218'; }}>
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => onDelete(s.id)} style={{ width: 36, height: 36, borderRadius: 10, background: '#F3E5DF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C05A38', transition: 'all 150ms' }} onMouseEnter={e => { e.currentTarget.style.background = '#C05A38'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = '#F3E5DF'; e.currentTarget.style.color = '#C05A38'; }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ADD / EDIT MODAL
══════════════════════════════════════════════════════ */
function ScheduleModal({ form, setForm, isEdit, onSave, onClose }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isValid = form.title.trim() && form.date;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(43,34,24,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{
        background: '#FAF9F6', borderRadius: 22, width: '100%', maxWidth: 560,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(43,34,24,0.25)',
        animation: 'slideDown 0.2s ease',
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 26px 0' }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#2B2218' }}>
            {isEdit ? '✏️ Edit Schedule' : '➕ New Schedule'}
          </h3>
          <button onClick={onClose} style={{ background: '#F0EBE3', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A7068' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '20px 26px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Title */}
          <Field label="Post Title *">
            <input value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. Spring Collection Launch 🌸"
              style={inputStyle} />
          </Field>

          {/* Platform */}
          <Field label="Platform">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => set('platform', p.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 999, border: `1.5px solid ${form.platform === p.id ? p.color : '#E8E0D4'}`,
                  background: form.platform === p.id ? p.bg : '#F0EBE3',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, color: form.platform === p.id ? p.color : '#7A7068',
                  transition: 'all 150ms',
                }}>
                  <p.Icon size={13} />{p.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date *">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Time">
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)} style={inputStyle} />
            </Field>
          </div>

          {/* Content Type + Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Content Type">
              <select value={form.contentType} onChange={e => set('contentType', e.target.value)} style={inputStyle}>
                {CONTENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)} style={inputStyle}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Caption */}
          <Field label="Caption">
            <textarea value={form.caption} onChange={e => set('caption', e.target.value)}
              placeholder="Write your post caption here..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </Field>

          {/* Hashtags */}
          <Field label="Hashtags">
            <input value={form.hashtags} onChange={e => set('hashtags', e.target.value)}
              placeholder="#marketing #content #growth"
              style={inputStyle} />
          </Field>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 999, border: '1.5px solid #E8E0D4', background: '#F0EBE3', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#2B2218', fontFamily: 'inherit' }}>
              Cancel
            </button>
            <button onClick={onSave} disabled={!isValid} style={{
              flex: 2, padding: '12px', borderRadius: 999, border: 'none',
              background: isValid ? '#C05A38' : '#E8E0D4',
              cursor: isValid ? 'pointer' : 'not-allowed',
              fontSize: 14, fontWeight: 700, color: isValid ? '#fff' : '#B0A89C',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 150ms',
            }}>
              <Check size={16} /> {isEdit ? 'Save Changes' : 'Schedule Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#7A7068', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1.5px solid #E8E0D4', background: '#F0EBE3',
  fontSize: 14, color: '#2B2218', fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 150ms',
};
