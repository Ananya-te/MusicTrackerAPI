const { runQuery, getRow, getAll } = require('../database/db');

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const { genre, artist, album, limit = 50, offset = 0 } = req.query;
    
    let sql = 'SELECT * FROM songs WHERE 1=1';
    const params = [];
    
    // Add filters
    if (genre) {
      sql += ' AND genre LIKE ?';
      params.push(`%${genre}%`);
    }
    
    if (artist) {
      sql += ' AND artist LIKE ?';
      params.push(`%${artist}%`);
    }
    
    if (album) {
      sql += ' AND album LIKE ?';
      params.push(`%${album}%`);
    }
    
    // Add pagination
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const songs = await getAll(sql, params);
    
    res.json({
      success: true,
      data: songs,
      count: songs.length,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error getting songs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve songs',
      error: error.message
    });
  }
};

// Get song by ID
const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const song = await getRow('SELECT * FROM songs WHERE id = ?', [id]);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    res.json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error getting song:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve song',
      error: error.message
    });
  }
};

// Create new song
const createSong = async (req, res) => {
  try {
    const { title, artist, album, genre, duration, year, rating } = req.body;
    
    // Validation
    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: 'Title and artist are required'
      });
    }
    
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const sql = `
      INSERT INTO songs (title, artist, album, genre, duration, year, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await runQuery(sql, [title, artist, album, genre, duration, year, rating]);
    
    // Get the created song
    const newSong = await getRow('SELECT * FROM songs WHERE id = ?', [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'Song created successfully',
      data: newSong
    });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create song',
      error: error.message
    });
  }
};

// Update song
const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre, duration, year, rating } = req.body;
    
    // Check if song exists
    const existingSong = await getRow('SELECT * FROM songs WHERE id = ?', [id]);
    if (!existingSong) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Validation
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const sql = `
      UPDATE songs 
      SET title = COALESCE(?, title),
          artist = COALESCE(?, artist),
          album = COALESCE(?, album),
          genre = COALESCE(?, genre),
          duration = COALESCE(?, duration),
          year = COALESCE(?, year),
          rating = COALESCE(?, rating),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await runQuery(sql, [title, artist, album, genre, duration, year, rating, id]);
    
    // Get the updated song
    const updatedSong = await getRow('SELECT * FROM songs WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Song updated successfully',
      data: updatedSong
    });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update song',
      error: error.message
    });
  }
};

// Delete song
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if song exists
    const existingSong = await getRow('SELECT * FROM songs WHERE id = ?', [id]);
    if (!existingSong) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    await runQuery('DELETE FROM songs WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Song deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete song',
      error: error.message
    });
  }
};

// Search songs
const searchSongs = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const sql = `
      SELECT * FROM songs 
      WHERE title LIKE ? OR artist LIKE ? OR album LIKE ? OR genre LIKE ?
      ORDER BY 
        CASE 
          WHEN title LIKE ? THEN 1
          WHEN artist LIKE ? THEN 2
          WHEN album LIKE ? THEN 3
          ELSE 4
        END,
        created_at DESC
      LIMIT ?
    `;
    
    const searchTerm = `%${q}%`;
    const exactMatch = `${q}%`;
    
    const songs = await getAll(sql, [
      searchTerm, searchTerm, searchTerm, searchTerm,
      exactMatch, exactMatch, exactMatch,
      parseInt(limit)
    ]);
    
    res.json({
      success: true,
      data: songs,
      count: songs.length,
      query: q
    });
  } catch (error) {
    console.error('Error searching songs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search songs',
      error: error.message
    });
  }
};

// Get song statistics
const getSongStats = async (req, res) => {
  try {
    const stats = await getRow(`
      SELECT 
        COUNT(*) as total_songs,
        COUNT(DISTINCT artist) as unique_artists,
        COUNT(DISTINCT album) as unique_albums,
        COUNT(DISTINCT genre) as unique_genres,
        AVG(rating) as avg_rating,
        AVG(duration) as avg_duration
      FROM songs
    `);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting song stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get song statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  searchSongs,
  getSongStats
};
