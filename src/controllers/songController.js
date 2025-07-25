const songService = require('../services/songService');

class SongController {
  // GET /api/songs
  async getAllSongs(req, res, next) {
    try {
      const filters = {
        genre: req.query.genre,
        artist: req.query.artist,
        search: req.query.search
      };

      const songs = await songService.getAllSongs(filters);
      
      res.json({
        success: true,
        count: songs.length,
        data: songs
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/songs/:id
  async getSongById(req, res, next) {
    try {
      const song = await songService.getSongById(req.params.id);
      
      if (!song) {
        return res.status(404).json({
          success: false,
          error: 'Song not found'
        });
      }

      res.json({
        success: true,
        data: song
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/songs
  async createSong(req, res, next) {
    try {
      const song = await songService.createSong(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Song created successfully',
        data: song
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/songs/:id
  async updateSong(req, res, next) {
    try {
      const song = await songService.updateSong(req.params.id, req.body);
      
      res.json({
        success: true,
        message: 'Song updated successfully',
        data: song
      });
    } catch (error) {
      if (error.message === 'Song not found') {
        return res.status(404).json({
          success: false,
          error: 'Song not found'
        });
      }
      next(error);
    }
  }

  // DELETE /api/songs/:id
  async deleteSong(req, res, next) {
    try {
      await songService.deleteSong(req.params.id);
      
      res.json({
        success: true,
        message: 'Song deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Song not found') {
        return res.status(404).json({
          success: false,
          error: 'Song not found'
        });
      }
      next(error);
    }
  }
}

module.exports = new SongController();
