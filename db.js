const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./music.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    artist TEXT,
    genre TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS playlist_songs (
    playlist_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY(playlist_id) REFERENCES playlists(id),
    FOREIGN KEY(song_id) REFERENCES songs(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    user_id INTEGER,
    song_id INTEGER,
    PRIMARY KEY(user_id, song_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(song_id) REFERENCES songs(id)
  )`);

  // Extend songs table for search/mood (if not already present)
  db.run(`ALTER TABLE songs ADD COLUMN album TEXT`);
  db.run(`ALTER TABLE songs ADD COLUMN year INTEGER`);
  db.run(`ALTER TABLE songs ADD COLUMN mood TEXT`);
});

module.exports = db;
