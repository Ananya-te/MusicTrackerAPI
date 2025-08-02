const { songSchema, playlistSchema, playlistSongSchema } = require('../utils/validation');

const validateSong = (req, res, next) => {
  const { error } = songSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

const validatePlaylist = (req, res, next) => {
  const { error } = playlistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

const validatePlaylistSong = (req, res, next) => {
  const { error } = playlistSongSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateSong,
  validatePlaylist,
  validatePlaylistSong
};
