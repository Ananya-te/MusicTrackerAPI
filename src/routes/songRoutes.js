const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { validateSong } = require('../middleware/validation');

// GET /api/songs - Get all songs (with optional filtering)
router.get('/', songController.getAllSongs);

// GET /api/songs/:id - Get song by ID
router.get('/:id', songController.getSongById);

// POST /api/songs - Create new song
router.post('/', validateSong, songController.createSong);

// PUT /api/songs/:id - Update song
router.put('/:id', validateSong, songController.updateSong);

// DELETE /api/songs/:id - Delete song
router.delete('/:id', songController.deleteSong);

module.exports = router;
