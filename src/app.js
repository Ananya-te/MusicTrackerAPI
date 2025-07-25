const express = require('express');
const cors = require('cors');
const path = require('path');

// Import configuration and middleware
const config = require('./config/config');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const apiRoutes = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {

    
    // CORS configuration
    this.app.use(cors({
      origin: config.cors.origin,
      credentials: true
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files
    this.app.use(express.static(path.join(__dirname, '../public')));

    // Request logging in development
    if (config.server.environment === 'development') {
      this.app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
      });
    }
  }

  setupRoutes() {
    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        message: '🎵 Welcome to Music Tracker API',
        version: '1.0.0',
        documentation: '/api/health',
        endpoints: {
          songs: '/api/songs',
          playlists: '/api/playlists'
        }
      });
    });

    // API routes
    this.app.use('/api', apiRoutes);

    // Backward compatibility routes (for existing frontend)
    this.app.use('/api/songs/songs', apiRoutes);
  }

  setupErrorHandling() {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  start() {
    const port = config.server.port;
    
    this.app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📱 Environment: ${config.server.environment}`);
      console.log(`🎵 Music Tracker API v1.0.0 is ready!`);
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
