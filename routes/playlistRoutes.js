const express = require('express');
const router = express.Router();
const {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  reorderPlaylistSongs
} = require('../controllers/playlistController');

// GET /api/playlists - Get all playlists
router.get('/', getAllPlaylists);

// GET /api/playlists/:id - Get playlist by ID with songs
router.get('/:id', getPlaylistById);

// POST /api/playlists - Create new playlist
router.post('/', createPlaylist);

// PUT /api/playlists/:id - Update playlist
router.put('/:id', updatePlaylist);

// DELETE /api/playlists/:id - Delete playlist
router.delete('/:id', deletePlaylist);

// POST /api/playlists/:playlistId/songs/:songId - Add song to playlist
router.post('/:playlistId/songs/:songId', addSongToPlaylist);

// DELETE /api/playlists/:playlistId/songs/:songId - Remove song from playlist
router.delete('/:playlistId/songs/:songId', removeSongFromPlaylist);

// PUT /api/playlists/:playlistId/reorder - Reorder songs in playlist
router.put('/:playlistId/reorder', reorderPlaylistSongs);

module.exports = router; 