const db = require('../config/database');

class SongService {
  // Get all songs with optional filtering
  async getAllSongs(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM songs';
     

      

      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get song by ID
  async getSongById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM songs WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Create new song
  async createSong(songData) {
    return new Promise((resolve, reject) => {
      const { title, artist, genre} = songData;
      
      db.run(
        'INSERT INTO songs (title, artist, genre) VALUES (?, ?, ?)',
        [title, artist, genre],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              title,
              artist,
              genre,
            });
          }
        }
      );
    });
  }

  // Update song
  async updateSong(id, songData) {
    return new Promise((resolve, reject) => {
      const { title, artist, genre, duration, release_year, album } = songData;
      
      db.run(
        'UPDATE songs SET title = ?, artist = ?, genre = ?, duration = ?, release_year = ?, album = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, artist, genre, duration, release_year, album, id],
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            reject(new Error('Song not found'));
          } else {
            resolve({ id, title, artist, genre, duration, release_year, album });
          }
        }
      );
    });
  }

  // Delete song
  async deleteSong(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM songs WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Song not found'));
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = new SongService();
