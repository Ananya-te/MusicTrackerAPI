const express = require('express');
const router = express.Router();
const songController = require('../controllers/songsController');

router.get('/', songController.getSongs);
router.post('/', songController.addSong);

module.exports = router;