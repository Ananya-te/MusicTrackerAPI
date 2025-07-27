const db = require('../db');
exports.getSongs = (req, res) => {
  // Build dynamic WHERE clause based on query params
  const filters = [];
  const values = [];
  ['title', 'artist', 'genre', 'album', 'year', 'mood'].forEach(field => {
    if (req.query[field]) {
      filters.push(`${field} = ?`);
      values.push(req.query[field]);
    }
  });
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  db.all(`SELECT * FROM songs ${where}`, values, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addSong = (req, res) => {
  const { title, artist, genre, album, year, mood } = req.body;
  if (!title || !artist || !genre) {
    return res.status(400).json({ error: 'Missing song fields' });
  }
  db.run(
    'INSERT INTO songs (title, artist, genre, album, year, mood) VALUES (?, ?, ?, ?, ?, ?)',
    [title, artist, genre, album || null, year || null, mood || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, artist, genre, album, year, mood });
    }
  );
};

exports.getPlaylists = (req, res) => {
  db.all('SELECT * FROM playlists', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createPlaylist = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Playlist name is required' });
  db.run('INSERT INTO playlists (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
};
