const db = require('./db');

exports.listFavorites = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!req.user || req.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.all(
    `SELECT songs.* FROM favorites JOIN songs ON favorites.song_id = songs.id WHERE favorites.user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

exports.addFavorite = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const songId = parseInt(req.params.songId, 10);
  if (!req.user || req.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.run(
    `INSERT OR IGNORE INTO favorites (user_id, song_id) VALUES (?, ?)`,
    [userId, songId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Added to favorites' });
    }
  );
};

exports.removeFavorite = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const songId = parseInt(req.params.songId, 10);
  if (!req.user || req.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.run(
    `DELETE FROM favorites WHERE user_id = ? AND song_id = ?`,
    [userId, songId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Removed from favorites' });
    }
  );
}; 