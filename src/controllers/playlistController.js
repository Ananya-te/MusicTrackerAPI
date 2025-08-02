const playlistService = require('../services/playlistService');

class PlaylistController {
  // GET /api/playlists
  async getAllPlaylists(req, res, next) {
    try {
      const playlists = await playlistService.getAllPlaylists();
      
      res.json({
        success: true,
        count: playlists.length,
        data: playlists
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/playlists/:id
  async getPlaylistById(req, res, next) {
    try {
      const playlist = await playlistService.getPlaylistById(req.params.id);
      
      if (!playlist) {
        return res.status(404).json({
          success: false,
          error: 'Playlist not found'
        });
      }

      res.json({
        success: true,
        data: playlist
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/playlists
  async createPlaylist(req, res, next) {
    try {
      const playlist = await playlistService.createPlaylist(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Playlist created successfully',
        data: playlist
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/playlists/:id
  async updatePlaylist(req, res, next) {
    try {
      const playlist = await playlistService.updatePlaylist(req.params.id, req.body);
      
      res.json({
        success: true,
        message: 'Playlist updated successfully',
        data: playlist
      });
    } catch (error) {
      if (error.message === 'Playlist not found') {
        return res.status(404).json({
          success: false,
          error: 'Playlist not found'
        });
      }
      next(error);
    }
  }

  // DELETE /api/playlists/:id
  async deletePlaylist(req, res, next) {
    try {
      await playlistService.deletePlaylist(req.params.id);
      
      res.json({
        success: true,
        message: 'Playlist deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Playlist not found') {
        return res.status(404).json({
          success: false,
          error: 'Playlist not found'
        });
      }
      next(error);
    }
  }

  // POST /api/playlists/:id/songs
  async addSongToPlaylist(req, res, next) {
    try {
      const result = await playlistService.addSongToPlaylist(
        req.params.id,
        req.body.song_id,
        req.body.position
      );
      
      res.status(201).json({
        success: true,
        message: 'Song added to playlist successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/playlists/:id/songs/:songId
  async removeSongFromPlaylist(req, res, next) {
    try {
      await playlistService.removeSongFromPlaylist(req.params.id, req.params.songId);
      
      res.json({
        success: true,
        message: 'Song removed from playlist successfully'
      });
    } catch (error) {
      if (error.message === 'Song not found in playlist') {
        return res.status(404).json({
          success: false,
          error: 'Song not found in playlist'
        });
      }
      next(error);
    }
  }
}

module.exports = new PlaylistController();
