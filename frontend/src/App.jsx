import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import ContentStudio from './pages/ContentStudio';
import Analytics from './pages/Analytics';
import Strategy from './pages/Strategy';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Login from './pages/Login';
import TrendDetection from './pages/TrendDetection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Protected App Pages with Layout wrapper */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/trending" element={<Layout><TrendDetection /></Layout>} />
        <Route path="/trend-detection" element={<Layout><TrendDetection /></Layout>} />
        <Route path="/trends" element={<Layout><Trends /></Layout>} />
        <Route path="/studio" element={<Layout><ContentStudio /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/strategy" element={<Layout><Strategy /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />

        {/* Global Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
