const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

const getOAuthClient = () => new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        connectedPlatforms: user.connectedPlatforms || {},
        token: generateToken(user._id) 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({
      success: true,
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        connectedPlatforms: user.connectedPlatforms || {},
        token: generateToken(user._id) 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const oauth2Client = getOAuthClient();
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['openid', 'email', 'profile']
    });
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ success: false, message: 'Missing authorization code' });

    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, message: 'Unable to verify Google account' });
    }

    const { email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: randomPassword,
        role: 'Creator',
        profileImage: picture || '',
        authProvider: 'google'
      });
    } else {
      if (picture && user.profileImage !== picture) {
        user.profileImage = picture;
        user.authProvider = 'google';
        await user.save();
      }
    }

    const token = generateToken(user._id);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || '',
      connectedPlatforms: user.connectedPlatforms || {},
      token
    };
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(userData))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ success: false, message: 'Google callback failed' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || '',
        connectedPlatforms: user.connectedPlatforms || {}
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getConnectedPlatforms = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const platforms = ['instagram', 'youtube', 'linkedin', 'twitter'];
    const connectedPlatforms = {};
    
    platforms.forEach(platform => {
      if (user.connectedPlatforms && user.connectedPlatforms[platform]) {
        connectedPlatforms[platform] = {
          connected: true,
          ...user.connectedPlatforms[platform],
          connectedAt: user.connectedPlatforms[platform].connectedAt || new Date(),
          lastSync: user.connectedPlatforms[platform].lastSync || null
        };
      } else {
        connectedPlatforms[platform] = { connected: false };
      }
    });
    
    res.json({ success: true, data: connectedPlatforms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.connectPlatform = async (req, res) => {
  try {
    const { platform, handle, accessToken } = req.body;
    
    if (!platform || !['instagram', 'youtube', 'linkedin', 'twitter'].includes(platform)) {
      return res.status(400).json({ success: false, message: 'Invalid platform' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Initialize connectedPlatforms if not exists
    if (!user.connectedPlatforms) {
      user.connectedPlatforms = {};
    }
    
    // Simulate connection (in real app, would validate with actual API)
    const savedHandle = handle ? (handle.startsWith('@') ? handle : `@${handle}`) : `@${user.name.toLowerCase().replace(/\s+/g, '_')}`;
    user.connectedPlatforms[platform] = {
      connected: true,
      handle: savedHandle,
      accessToken: accessToken || `mock_token_${Date.now()}`,
      connectedAt: new Date(),
      lastSync: new Date()
    };
    
    await user.save();
    
    res.json({
      success: true,
      message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} connected successfully`,
      data: user.connectedPlatforms
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.disconnectPlatform = async (req, res) => {
  try {
    const { platform } = req.body;
    
    if (!platform || !['instagram', 'youtube', 'linkedin', 'twitter'].includes(platform)) {
      return res.status(400).json({ success: false, message: 'Invalid platform' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    if (user.connectedPlatforms && user.connectedPlatforms[platform]) {
      user.connectedPlatforms[platform] = { connected: false };
      await user.save();
    }
    
    res.json({
      success: true,
      message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} disconnected successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
