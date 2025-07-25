const db = require('../config/database');

class PlaylistService {
  // Get all playlists
  async getAllPlaylists() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM playlists', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get playlist by ID with songs
  async getPlaylistById(id) {
    return new Promise((resolve, reject) => {
      // Get playlist details
      db.get('SELECT * FROM playlists WHERE id = ?', [id], (err, playlist) => {
        if (err) {
          reject(err);
          return;
        }

        if (!playlist) {
          resolve(null);
          return;
        }

        // Get songs in playlist
        db.all(`
          SELECT s.*, ps.position, ps.added_at
          FROM songs s
          JOIN playlist_songs ps ON s.id = ps.song_id
          WHERE ps.playlist_id = ?
          ORDER BY ps.position, ps.added_at
        `, [id], (err, songs) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              ...playlist,
              songs: songs || []
            });
          }
        });
      });
    });
  }

  // Create new playlist
  async createPlaylist(playlistData) {
    return new Promise((resolve, reject) => {
      const { name } = playlistData;
      
      db.run(
        'INSERT INTO playlists (name) VALUES (?)',
        [name],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              name
            });
          }
        }
      );
    });
  }

  // Update playlist
  async updatePlaylist(id, playlistData) {
    return new Promise((resolve, reject) => {
      const { name} = playlistData;
      
      db.run(
        'UPDATE playlists SET name = ?,',
        [name, description, id],
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            reject(new Error('Playlist not found'));
          } else {
            resolve({ id, name, description });
          }
        }
      );
    });
  }

  // Delete playlist
  async deletePlaylist(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM playlists WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Playlist not found'));
        } else {
          resolve(true);
        }
      });
    });
  }

  // Add song to playlist
  async addSongToPlaylist(playlistId, songId, position = 0) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)',
        [playlistId, songId, position],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              playlist_id: playlistId,
              song_id: songId,
              position
            });
          }
        }
      );
    });
  }

  // Remove song from playlist
  async removeSongFromPlaylist(playlistId, songId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId],
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            reject(new Error('Song not found in playlist'));
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

module.exports = new PlaylistService();
