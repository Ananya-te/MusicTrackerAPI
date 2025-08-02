require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('✅ server.js is starting...');

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));


// Import route handlers
const songRoutes = require('./routes/songRoutes');

// Use main route prefixes
app.use('/api/songs', songRoutes);
app.use('/api/playlists', songRoutes); // Optional: same routes for playlists
app.use('/songs', songRoutes); // ✅ Fix: direct /songs access for testing tools

// Health check
app.get('/', (req, res) => {
  res.send('🎵 Music Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
