const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const { validatePlaylist, validatePlaylistSong } = require('../middleware/validation');

// GET /api/playlists - Get all playlists
router.get('/', playlistController.getAllPlaylists);

// GET /api/playlists/:id - Get playlist by ID (with songs)
router.get('/:id', playlistController.getPlaylistById);

// POST /api/playlists - Create new playlist
router.post('/', validatePlaylist, playlistController.createPlaylist);

// PUT /api/playlists/:id - Update playlist
router.put('/:id', validatePlaylist, playlistController.updatePlaylist);

// DELETE /api/playlists/:id - Delete playlist
router.delete('/:id', playlistController.deletePlaylist);

// POST /api/playlists/:id/songs - Add song to playlist
router.post('/:id/songs', validatePlaylistSong, playlistController.addSongToPlaylist);

// DELETE /api/playlists/:id/songs/:songId - Remove song from playlist
router.delete('/:id/songs/:songId', playlistController.removeSongFromPlaylist);

module.exports = router;
