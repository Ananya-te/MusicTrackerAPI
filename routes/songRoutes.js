const express = require('express');
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  searchSongs,
  getSongStats
} = require('../controllers/songController');

// GET /api/songs - Get all songs with optional filtering
router.get('/', getAllSongs);

// GET /api/songs/stats - Get song statistics
router.get('/stats', getSongStats);

// GET /api/songs/search - Search songs
router.get('/search', searchSongs);

// GET /api/songs/:id - Get song by ID
router.get('/:id', getSongById);

// POST /api/songs - Create new song
router.post('/', createSong);

// PUT /api/songs/:id - Update song
router.put('/:id', updateSong);

// DELETE /api/songs/:id - Delete song
router.delete('/:id', deleteSong);

module.exports = router;
