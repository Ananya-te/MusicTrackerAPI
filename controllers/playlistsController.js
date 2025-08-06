const db = require('../db');

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

exports.addSongToPlaylist = (req, res) => {
  const { playlist_id, song_id } = req.body;
  if (!playlist_id || !song_id) return res.status(400).json({ error: 'Playlist ID and Song ID required' });

  db.run('INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)', [playlist_id, song_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Song added to playlist' });
  });
};

exports.getSongsInPlaylist = (req, res) => {
  const { id } = req.params;
  db.all(`SELECT s.* FROM songs s
          INNER JOIN playlist_songs ps ON s.id = ps.song_id
          WHERE ps.playlist_id = ?`, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};