const db = require('./db');

const getPlaylists = (req, res) => {
  db.all('SELECT * FROM playlists', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const createPlaylist = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing playlist name' });
  db.run('INSERT INTO playlists (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
};

const getMoodPlaylist = (req, res) => {
  const mood = req.query.type;
  if (!mood) return res.status(400).json({ error: 'Mood type is required' });
  db.all('SELECT * FROM songs WHERE LOWER(mood) = LOWER(?)', [mood], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

module.exports = { getPlaylists, createPlaylist, getMoodPlaylist };  // ✅ MUST BE CORRECT
