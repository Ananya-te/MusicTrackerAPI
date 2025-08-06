const db = require("../db");

// Introduced centralized error handling to log detailed
// server errors and return a consistent, generic message to the client

function handleServerError(res, err) {
  console.error("[SERVER ERROR]", err);
  res.status(500).json({ error: "Internal Server error" });
}

exports.getSongs = (req, res) => {
  db.all("SELECT * FROM songs", (err, rows) => {
    if (err) return handleServerError(res, err);
    res.json(rows);
  });
};

exports.addSong = (req, res) => {
  const { title, artist, genre } = req.body;

  if (!title || !artist || !genre) {
    return res.status(400).json({ error: "Missing required song fields" });
  }

  db.run(
    "INSERT INTO songs (title, artist, genre) VALUES (?, ?, ?)",
    [title, artist, genre],
    function (err) {
      if (err) return handleServerError(res, err);
      res.status(201).json({ id: this.lastID, title, artist, genre });
    }
  );
};

exports.getPlaylists = (req, res) => {
  db.all("SELECT * FROM playlists", (err, rows) => {
    if (err) return handleServerError(res, err);
    res.json(rows);
  });
};

exports.createPlaylist = (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: "Playlist name is required" });

  db.run("INSERT INTO playlists (name) VALUES (?)", [name], function (err) {
    if (err) return handleServerError(res, err);
    res.status(201).json({ id: this.lastID, name });
  });
};
