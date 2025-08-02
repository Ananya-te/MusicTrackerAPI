const express = require('express');
const router = express.Router();

// Import route modules
const songRoutes = require('./songRoutes');
const playlistRoutes = require('./playlistRoutes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '🎵 Music Tracker API is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
router.use('/songs', songRoutes);
router.use('/playlists', playlistRoutes);

module.exports = router;
