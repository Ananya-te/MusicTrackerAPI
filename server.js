const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();

console.log('✅ Music Tracker API is starting...');

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors(config.cors));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎵 Music Tracker API is running!',
    version: '1.0.0',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Music Tracker API',
    version: '1.0.0',
    endpoints: {
      songs: '/api/songs',
      playlists: '/api/playlists',
      health: '/'
    },
    documentation: 'Check README.md for API documentation'
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🗄️  Database: ${config.dbPath}`);
  console.log(`🎵 API Endpoints:`);
  console.log(`   - Songs: http://localhost:${PORT}/api/songs`);
  console.log(`   - Playlists: http://localhost:${PORT}/api/playlists`);
  console.log(`   - Health: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
