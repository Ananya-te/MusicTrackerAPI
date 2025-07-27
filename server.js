const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();
const db = require('./db');
const spotifyController = require('./spotifyController');
const favoritesController = require('./favoritesController');
const playlistController = require('./playlistController');

const app = express();
const PORT = 5000;

// Session and Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return done(err);
    done(null, row);
  });
});

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_CALLBACK_URL
}, (accessToken, refreshToken, expires_in, profile, done) => {
  // Find or create user in DB, and store access token
  db.get('SELECT * FROM users WHERE username = ?', [profile.username || profile.id], (err, row) => {
    if (err) return done(err);
    if (row) {
      db.run('UPDATE users SET spotify_access_token = ? WHERE id = ?', [accessToken, row.id], (err) => {
        if (err) return done(err);
        row.spotify_access_token = accessToken;
        return done(null, row);
      });
    } else {
      db.run('INSERT INTO users (username, email, password, spotify_access_token) VALUES (?, ?, ?, ?)', [profile.username || profile.id, profile.emails && profile.emails[0] ? profile.emails[0].value : null, null, accessToken], function (err) {
        if (err) return done(err);
        db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, newUser) => {
          if (err) return done(err);
          newUser.spotify_access_token = accessToken;
          done(null, newUser);
        });
      });
    }
  });
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Not authenticated' });
}

// Spotify API endpoints (protected)
app.get('/api/spotify/current', ensureAuthenticated, spotifyController.getCurrentTrack);
app.get('/api/spotify/playlists', ensureAuthenticated, spotifyController.getUserPlaylists);
app.get('/api/spotify/liked', ensureAuthenticated, spotifyController.getLikedSongs);

// User favorites endpoints (protected)
app.get('/api/users/:userId/favorites', ensureAuthenticated, favoritesController.listFavorites);
app.post('/api/users/:userId/favorites/:songId', ensureAuthenticated, favoritesController.addFavorite);
app.delete('/api/users/:userId/favorites/:songId', ensureAuthenticated, favoritesController.removeFavorite);

// Mood-based playlists (protected)
app.get('/api/playlists/mood', playlistController.getMoodPlaylist);

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

// Auth endpoints
app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private', 'playlist-read-private', 'user-library-read']
}));

app.get('/auth/spotify/callback', passport.authenticate('spotify', {
  failureRedirect: '/login',
  session: true
}), (req, res) => {
  res.redirect('/'); // Redirect to frontend or dashboard after login
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('🎵 Music Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
