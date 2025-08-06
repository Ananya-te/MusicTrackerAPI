const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistsController');

router.get('/', playlistController.getPlaylists);
router.post('/', playlistController.createPlaylist);
router.post('/add-song', playlistController.addSongToPlaylist);
router.get('/:id/songs', playlistController.getSongsInPlaylist);

module.exports = router;
