import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

/* ─── Safety Icon Components (SVG) ─── */
const SVGIcon = ({ children, size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const UpIcon = (p) => <SVGIcon {...p}><polyline points="7 17 17 7"/><polyline points="7 7 17 7 17 17"/></SVGIcon>;
const DownIcon = (p) => <SVGIcon {...p}><polyline points="7 7 17 17"/><polyline points="17 7 17 17 7 17"/></SVGIcon>;
const GrowIcon = (p) => <SVGIcon {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SVGIcon>;

const DATE_RANGES = ['7D', '30D', '90D', 'Custom'];
const PLAT_TABS = ['All Platforms', 'Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X'];

const kpis = [
  { label: 'Total Reach',      value: '2.4M',    delta: '+12%',  up: true  },
  { label: 'Engagement Rate',  value: '4.8%',    delta: '+0.6%', up: true  },
  { label: 'Watch Time',       value: '18.2K hrs',delta: '+22%', up: true  },
  { label: 'Shares',           value: '84.1K',   delta: '-3%',   up: false },
  { label: 'Follower Growth',  value: '+12.4K',  delta: '+9%',   up: true  },
];

const lineData = [
  { week: 'Week 1', instagram: 18000, youtube: 14000, tiktok: 45000, linkedin: 10000, twitter: 22000 },
  { week: 'Week 2', instagram: 22000, youtube: 18000, tiktok: 55000, linkedin: 12000, twitter: 24000 },
  { week: 'Week 3', instagram: 28000, youtube: 22000, tiktok: 52000, linkedin: 14000, twitter: 26000 },
  { week: 'Week 4', instagram: 38000, youtube: 25000, tiktok: 68000, linkedin: 16000, twitter: 28000 },
  { week: 'Week 5', instagram: 32000, youtube: 28000, tiktok: 72000, linkedin: 15000, twitter: 30000 },
  { week: 'Week 6', instagram: 48000, youtube: 35000, tiktok: 92000, linkedin: 18000, twitter: 28000 },
];

const followerData = [
  { month: 'Jan', followers: 12000 },
  { month: 'Feb', followers: 16000 },
  { month: 'Mar', followers: 20000 },
  { month: 'Apr', followers: 24000 },
  { month: 'May', followers: 30000 },
  { month: 'Jun', followers: 39000 },
];

const donut = [
  { name: 'Instagram', value: 35, color: '#C05A38' },
  { name: 'TikTok',    value: 28, color: '#7A9A6E' },
  { name: 'YouTube',   value: 18, color: '#506B40' },
  { name: 'LinkedIn',  value: 12, color: '#C9A96E' },
  { name: 'X',         value: 7,  color: '#3A3028' },
];

const contentTable = [
  { title: 'AI trick that changed my content game forever...', platform: 'Instagram', views: '124.0K', eng: '9.2', v: 88, posted: '2 days ago' },
  { title: "The algorithm doesn't pick winners randomly 🧵", platform: 'Twitter',   views: '87.0K',  eng: '7.8', v: 82, posted: '4 days ago' },
  { title: 'POV: You cracked the content code 💡',          platform: 'TikTok',    views: '248.0K', eng: '11.4', v: 91, posted: '1 week ago' },
  { title: 'B2B Content Strategy That Actually Works',       platform: 'LinkedIn',  views: '34.0K',  eng: '6.1', v: 74, posted: '1 week ago' },
  { title: 'AI Tools Comparison 2025 | Full Review',        platform: 'YouTube',   views: '89.0K',  eng: '8.3', v: 86, posted: '2 weeks ago' },
];

const algoMetrics = [
  { label: 'Watch Time Retention', score: 78 },
  { label: 'Save Rate',            score: 62 },
  { label: 'Comment Rate',         score: 84 },
  { label: 'Share Rate',           score: 71 },
  { label: 'CTR',                  score: 55 },
];

const platColor = { 
  TikTok:    { bg:'#E6F0E6', text:'#506B40' },
  Instagram: { bg:'#FEE8DC', text:'#C05A38' },
  LinkedIn:  { bg:'#FEF8E2', text:'#A87B00' },
  YouTube:   { bg:'#FEF0EA', text:'#A8442A' },
  Twitter:   { bg:'#FEF8E2', text:'#8A7A5A' },
  X:         { bg:'#FEF8E2', text:'#8A7A5A' }
};
