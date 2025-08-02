require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development'
  },
  database: {
    path: process.env.DB_PATH || './data/music.db'
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    }
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }
};
