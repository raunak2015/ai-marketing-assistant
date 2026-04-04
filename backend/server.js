const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/youtube', require('./routes/youtubeRoutes'));
app.use('/api/twitter', require('./routes/twitterRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/strategy', require('./routes/strategyRoutes'));

// Dummy endpoints for Instagram, LinkedIn, TikTok (mock data for frontend)
app.get('/api/instagram/trending', (req, res) => {
  res.json({ success: true, data: Array(10).fill().map((_, i) => ({ id: i, title: `Instagram Post ${i}`, likes: Math.floor(Math.random() * 10000), comments: Math.floor(Math.random() * 1000) })) });
});
app.get('/api/linkedin/trending', (req, res) => {
  res.json({ success: true, data: Array(10).fill().map((_, i) => ({ id: i, title: `LinkedIn Article ${i}`, likes: Math.floor(Math.random() * 5000) })) });
});
app.get('/api/tiktok/trending', (req, res) => {
  res.json({ success: true, data: Array(10).fill().map((_, i) => ({ id: i, title: `TikTok Video ${i}`, views: Math.floor(Math.random() * 100000) })) });
});

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📺 YouTube: http://localhost:${PORT}/api/youtube/trending`);
});
