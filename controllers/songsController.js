const db = require('../db');

exports.getSongs = (req, res) => {
  db.all('SELECT * FROM songs', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addSong = (req, res) => {
  const { title, artist, genre } = req.body;
  if (!title || !artist || !genre) {
    return res.status(400).json({ error: 'Missing song fields' });
  }

  db.run('INSERT INTO songs (title, artist, genre) VALUES (?, ?, ?)', [title, artist, genre], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, artist, genre });
  });
};
