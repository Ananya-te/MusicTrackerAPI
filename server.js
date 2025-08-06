require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));


// Register user
app.post('/api/register', (req, res) => {
  const { username, email, password, genre } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'User already exists' });
    }
    db.run('INSERT INTO users (username, email, password, genre) VALUES (?, ?, ?, ?)',
      [username, email, password, genre],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Registered successfully!' });
      });
  });
});

// Login user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (!row) {
      return res.status(404).json({ message: 'User not found, please register' });
    }
    if (row.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Login successful', user: row });
  });
});






// Add new song
app.post('/api/songs', (req, res) => {
  const { title, artist, genre } = req.body;
  db.run(`INSERT INTO songs (title, artist, genre) VALUES (?, ?, ?)`, [title, artist, genre], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Get all songs
app.get('/api/songs', (req, res) => {
  db.all(`SELECT * FROM songs`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Create playlist
app.post('/api/playlists', (req, res) => {
  const { name } = req.body;
  db.run(`INSERT INTO playlists (name) VALUES (?)`, [name], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Get all playlists
app.get('/api/playlists', (req, res) => {
  db.all(`SELECT * FROM playlists`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Assign song to playlist
app.post('/api/playlists/add-song', (req, res) => {
  const { playlist_id, song_id } = req.body;
  db.run(`INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)`, [playlist_id, song_id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ message: 'Song added to playlist' });
  });
});

// Get songs in playlist
app.get('/api/playlists/:id/songs', (req, res) => {
  const id = req.params.id;
  db.all(`
    SELECT songs.* FROM songs
    JOIN playlist_songs ON songs.id = playlist_songs.song_id
    WHERE playlist_songs.playlist_id = ?
  `, [id], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🎵 Server is running on http://localhost:${PORT}`);
});
