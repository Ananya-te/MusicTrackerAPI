const { runQuery, getRow, getAll } = require('../database/db');

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const sql = `
      SELECT 
        p.*,
        COUNT(ps.song_id) as song_count,
        COALESCE(SUM(s.duration), 0) as total_duration
      FROM playlists p
      LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
      LEFT JOIN songs s ON ps.song_id = s.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const playlists = await getAll(sql, [parseInt(limit), parseInt(offset)]);
    
    res.json({
      success: true,
      data: playlists,
      count: playlists.length,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error getting playlists:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve playlists',
      error: error.message
    });
  }
};

// Get playlist by ID with songs
const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get playlist details
    const playlist = await getRow(`
      SELECT 
        p.*,
        COUNT(ps.song_id) as song_count,
        COALESCE(SUM(s.duration), 0) as total_duration
      FROM playlists p
      LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
      LEFT JOIN songs s ON ps.song_id = s.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Get songs in playlist
    const songs = await getAll(`
      SELECT 
        s.*,
        ps.position,
        ps.added_at as added_to_playlist
      FROM songs s
      JOIN playlist_songs ps ON s.id = ps.song_id
      WHERE ps.playlist_id = ?
      ORDER BY ps.position, ps.added_at
    `, [id]);
    
    res.json({
      success: true,
      data: {
        ...playlist,
        songs
      }
    });
  } catch (error) {
    console.error('Error getting playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve playlist',
      error: error.message
    });
  }
};

// Create new playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Playlist name is required'
      });
    }
    
    const sql = 'INSERT INTO playlists (name, description) VALUES (?, ?)';
    const result = await runQuery(sql, [name, description]);
    
    // Get the created playlist
    const newPlaylist = await getRow('SELECT * FROM playlists WHERE id = ?', [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'Playlist created successfully',
      data: newPlaylist
    });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create playlist',
      error: error.message
    });
  }
};

// Update playlist
const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    // Check if playlist exists
    const existingPlaylist = await getRow('SELECT * FROM playlists WHERE id = ?', [id]);
    if (!existingPlaylist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    const sql = `
      UPDATE playlists 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await runQuery(sql, [name, description, id]);
    
    // Get the updated playlist
    const updatedPlaylist = await getRow('SELECT * FROM playlists WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Playlist updated successfully',
      data: updatedPlaylist
    });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update playlist',
      error: error.message
    });
  }
};

// Delete playlist
const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if playlist exists
    const existingPlaylist = await getRow('SELECT * FROM playlists WHERE id = ?', [id]);
    if (!existingPlaylist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    await runQuery('DELETE FROM playlists WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Playlist deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete playlist',
      error: error.message
    });
  }
};

// Add song to playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const { position } = req.body;
    
    // Check if playlist exists
    const playlist = await getRow('SELECT * FROM playlists WHERE id = ?', [playlistId]);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Check if song exists
    const song = await getRow('SELECT * FROM songs WHERE id = ?', [songId]);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Check if song is already in playlist
    const existingEntry = await getRow(
      'SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
      [playlistId, songId]
    );
    
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'Song is already in this playlist'
      });
    }
    
    // Get next position if not specified
    let nextPosition = position;
    if (!nextPosition) {
      const maxPosition = await getRow(
        'SELECT MAX(position) as max_pos FROM playlist_songs WHERE playlist_id = ?',
        [playlistId]
      );
      nextPosition = (maxPosition.max_pos || 0) + 1;
    }
    
    await runQuery(
      'INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)',
      [playlistId, songId, nextPosition]
    );
    
    res.status(201).json({
      success: true,
      message: 'Song added to playlist successfully',
      data: {
        playlist_id: playlistId,
        song_id: songId,
        position: nextPosition
      }
    });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add song to playlist',
      error: error.message
    });
  }
};

// Remove song from playlist
const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    
    // Check if playlist exists
    const playlist = await getRow('SELECT * FROM playlists WHERE id = ?', [playlistId]);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Check if song is in playlist
    const existingEntry = await getRow(
      'SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
      [playlistId, songId]
    );
    
    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Song is not in this playlist'
      });
    }
    
    await runQuery(
      'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
      [playlistId, songId]
    );
    
    res.json({
      success: true,
      message: 'Song removed from playlist successfully'
    });
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove song from playlist',
      error: error.message
    });
  }
};

// Reorder songs in playlist
const reorderPlaylistSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songOrders } = req.body; // Array of { songId, position }
    
    if (!Array.isArray(songOrders)) {
      return res.status(400).json({
        success: false,
        message: 'songOrders must be an array'
      });
    }
    
    // Check if playlist exists
    const playlist = await getRow('SELECT * FROM playlists WHERE id = ?', [playlistId]);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Update positions
    for (const { songId, position } of songOrders) {
      await runQuery(
        'UPDATE playlist_songs SET position = ? WHERE playlist_id = ? AND song_id = ?',
        [position, playlistId, songId]
      );
    }
    
    res.json({
      success: true,
      message: 'Playlist reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder playlist',
      error: error.message
    });
  }
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  reorderPlaylistSongs
}; 