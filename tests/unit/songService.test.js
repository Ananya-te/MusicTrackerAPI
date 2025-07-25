const songService = require('../../src/services/songService');
const db = require('../../src/config/database');

// Mock the database
jest.mock('../../src/config/database', () => ({
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn()
}));

describe('SongService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSong', () => {
    test('should create a song successfully', async () => {
      const songData = {
        title: 'Believer',
        artist: 'Imagine Dragons',
        genre: 'Rock'
      };

      db.run.mockImplementation((sql, params, callback) => {
        callback.call({ lastID: 1 }, null);
      });

      const result = await songService.createSong(songData);

      expect(result).toEqual({
        id: 1,
        title: 'Believer',
        artist: 'Imagine Dragons',
        genre: 'Rock',
        duration: undefined,
        release_year: undefined,
        album: undefined
      });
    });

    test('should handle database errors', async () => {
      const songData = {
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Test Genre'
      };

      db.run.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      await expect(songService.createSong(songData)).rejects.toThrow('Database error');
    });
  });

  describe('getAllSongs', () => {
    test('should return all songs', async () => {
      const mockSongs = [
        { id: 1, title: 'Song 1', artist: 'Artist 1', genre: 'Rock' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', genre: 'Pop' }
      ];

      db.all.mockImplementation((sql, callback) => {
        callback(null, mockSongs);
      });

      const result = await songService.getAllSongs();
      expect(result).toEqual(mockSongs);
    });
  });

  describe('getSongById', () => {
    test('should return a song by ID', async () => {
      const mockSong = { id: 1, title: 'Test Song', artist: 'Test Artist', genre: 'Rock' };

      db.get.mockImplementation((sql, params, callback) => {
        callback(null, mockSong);
      });

      const result = await songService.getSongById(1);
      expect(result).toEqual(mockSong);
    });

    test('should return null for non-existent song', async () => {
      db.get.mockImplementation((sql, params, callback) => {
        callback(null, null);
      });

      const result = await songService.getSongById(999);
      expect(result).toBeNull();
    });
  });
});
