const request = require('supertest');
const app = require('../server');
const { db } = require('../database/db');

describe('Music Tracker API', () => {
  let testSongId;
  let testPlaylistId;

  beforeAll(async () => {
    // Clear database before tests
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM playlist_songs', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM songs', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM playlists', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Music Tracker API is running');
    });
  });

  describe('API Info', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('Songs API', () => {
    describe('POST /api/songs', () => {
      it('should create a new song', async () => {
        const songData = {
          title: 'Test Song',
          artist: 'Test Artist',
          album: 'Test Album',
          genre: 'Rock',
          duration: 180,
          year: 2023,
          rating: 4
        };

        const response = await request(app)
          .post('/api/songs')
          .send(songData)
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(songData.title);
        expect(response.body.data.artist).toBe(songData.artist);
        testSongId = response.body.data.id;
      });

      it('should require title and artist', async () => {
        const response = await request(app)
          .post('/api/songs')
          .send({ genre: 'Rock' })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Title and artist are required');
      });

      it('should validate rating range', async () => {
        const response = await request(app)
          .post('/api/songs')
          .send({
            title: 'Test Song',
            artist: 'Test Artist',
            rating: 6
          })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Rating must be between 1 and 5');
      });
    });

    describe('GET /api/songs', () => {
      it('should get all songs', async () => {
        const response = await request(app)
          .get('/api/songs')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it('should filter songs by genre', async () => {
        const response = await request(app)
          .get('/api/songs?genre=Rock')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.every(song => song.genre === 'Rock')).toBe(true);
      });

      it('should support pagination', async () => {
        const response = await request(app)
          .get('/api/songs?limit=1&offset=0')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBeLessThanOrEqual(1);
        expect(response.body.pagination).toBeDefined();
      });
    });

    describe('GET /api/songs/:id', () => {
      it('should get song by ID', async () => {
        const response = await request(app)
          .get(`/api/songs/${testSongId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(testSongId);
      });

      it('should return 404 for non-existent song', async () => {
        const response = await request(app)
          .get('/api/songs/99999')
          .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Song not found');
      });
    });

    describe('PUT /api/songs/:id', () => {
      it('should update song', async () => {
        const updateData = {
          title: 'Updated Test Song',
          rating: 5
        };

        const response = await request(app)
          .put(`/api/songs/${testSongId}`)
          .send(updateData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(updateData.title);
        expect(response.body.data.rating).toBe(updateData.rating);
      });
    });

    describe('GET /api/songs/search', () => {
      it('should search songs', async () => {
        const response = await request(app)
          .get('/api/songs/search?q=Test')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.query).toBe('Test');
      });

      it('should require search query', async () => {
        const response = await request(app)
          .get('/api/songs/search')
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Search query is required');
      });
    });

    describe('GET /api/songs/stats', () => {
      it('should return song statistics', async () => {
        const response = await request(app)
          .get('/api/songs/stats')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.total_songs).toBeDefined();
        expect(response.body.data.unique_artists).toBeDefined();
        expect(response.body.data.unique_genres).toBeDefined();
      });
    });

    describe('DELETE /api/songs/:id', () => {
      it('should delete song', async () => {
        const response = await request(app)
          .delete(`/api/songs/${testSongId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('Song deleted successfully');
      });
    });
  });

  describe('Playlists API', () => {
    describe('POST /api/playlists', () => {
      it('should create a new playlist', async () => {
        const playlistData = {
          name: 'Test Playlist',
          description: 'A test playlist'
        };

        const response = await request(app)
          .post('/api/playlists')
          .send(playlistData)
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(playlistData.name);
        testPlaylistId = response.body.data.id;
      });

      it('should require playlist name', async () => {
        const response = await request(app)
          .post('/api/playlists')
          .send({ description: 'No name' })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Playlist name is required');
      });
    });

    describe('GET /api/playlists', () => {
      it('should get all playlists', async () => {
        const response = await request(app)
          .get('/api/playlists')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });
    });

    describe('GET /api/playlists/:id', () => {
      it('should get playlist by ID with songs', async () => {
        const response = await request(app)
          .get(`/api/playlists/${testPlaylistId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(testPlaylistId);
        expect(response.body.data.songs).toBeDefined();
      });
    });

    describe('PUT /api/playlists/:id', () => {
      it('should update playlist', async () => {
        const updateData = {
          name: 'Updated Test Playlist',
          description: 'Updated description'
        };

        const response = await request(app)
          .put(`/api/playlists/${testPlaylistId}`)
          .send(updateData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(updateData.name);
        expect(response.body.data.description).toBe(updateData.description);
      });
    });

    describe('DELETE /api/playlists/:id', () => {
      it('should delete playlist', async () => {
        const response = await request(app)
          .delete(`/api/playlists/${testPlaylistId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('Playlist deleted successfully');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should handle invalid JSON', async () => {
      const response = await request(app)
        .post('/api/songs')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
}); 