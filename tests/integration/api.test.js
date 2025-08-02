const request = require('supertest');
const App = require('../../src/app');

describe('Music Tracker API Integration Tests', () => {
  let app;

  beforeAll(() => {
    const appInstance = new App();
    app = appInstance.getApp();
  });

  describe('Health Check', () => {
    test('GET /api/health should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Songs API', () => {
    test('GET /api/songs should return songs list', async () => {
      const response = await request(app)
        .get('/api/songs')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/songs should create a new song', async () => {
      const newSong = {
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Test Genre'
      };

      const response = await request(app)
        .post('/api/songs')
        .send(newSong)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toMatchObject(newSong);
    });

    test('POST /api/songs should validate required fields', async () => {
      const invalidSong = {
        title: '',
        artist: 'Test Artist'
        // Missing genre
      };

      const response = await request(app)
        .post('/api/songs')
        .send(invalidSong)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation Error');
    });
  });

  describe('Playlists API', () => {
    test('GET /api/playlists should return playlists list', async () => {
      const response = await request(app)
        .get('/api/playlists')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/playlists should create a new playlist', async () => {
      const newPlaylist = {
        name: 'Test Playlist'
      };

      const response = await request(app)
        .post('/api/playlists')
        .send(newPlaylist)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('name', newPlaylist.name);
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route Not Found');
    });
  });
});
