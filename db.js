// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./music.db');
// // const path = require('path'); 
// // const dbPath = path.resolve(__dirname, 'music.db');
// // console.log('Loading DB from:', dbPath);

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS songs (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     artist TEXT,
//     genre TEXT
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS playlists (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS playlist_songs (
//     playlist_id INTEGER,
//     song_id INTEGER,
//     FOREIGN KEY(playlist_id) REFERENCES playlists(id),
//     FOREIGN KEY(song_id) REFERENCES songs(id)
//   )`);
// });

// module.exports = db;









// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./music.db');

// Create tables
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT,
    genre TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS playlist_songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playlist_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
  )`);
});

module.exports = db;
