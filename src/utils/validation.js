const Joi = require('joi');

const songSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title must be less than 255 characters'
  }),
  artist: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Artist is required',
    'string.max': 'Artist must be less than 255 characters'
  }),
  genre: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Genre is required',
    'string.max': 'Genre must be less than 100 characters'
  }),
});

const playlistSchema = Joi.object({
  name: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Playlist name is required',
    'string.max': 'Playlist name must be less than 255 characters'
  }),
  description: Joi.string().max(500).optional()
});

const playlistSongSchema = Joi.object({
  song_id: Joi.number().integer().positive().required(),
  position: Joi.number().integer().min(0).optional()
});

module.exports = {
  songSchema,
  playlistSchema,
  playlistSongSchema
};
