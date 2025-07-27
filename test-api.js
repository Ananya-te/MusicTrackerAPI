const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Music Tracker API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get('http://localhost:5000/');
    console.log('✅ Health check passed:', health.data.message);

    // Test API info
    console.log('\n2. Testing API info...');
    const apiInfo = await axios.get(`${BASE_URL}`);
    console.log('✅ API info retrieved:', apiInfo.data.message);

    // Test creating a song
    console.log('\n3. Testing song creation...');
    const songData = {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      genre: 'Rock',
      duration: 354,
      year: 1975,
      rating: 5
    };
    const createSong = await axios.post(`${BASE_URL}/songs`, songData);
    console.log('✅ Song created:', createSong.data.data.title);
    const songId = createSong.data.data.id;

    // Test getting all songs
    console.log('\n4. Testing get all songs...');
    const allSongs = await axios.get(`${BASE_URL}/songs`);
    console.log('✅ Retrieved', allSongs.data.count, 'songs');

    // Test getting song by ID
    console.log('\n5. Testing get song by ID...');
    const songById = await axios.get(`${BASE_URL}/songs/${songId}`);
    console.log('✅ Retrieved song:', songById.data.data.title);

    // Test updating song
    console.log('\n6. Testing song update...');
    const updateData = { rating: 4 };
    const updatedSong = await axios.put(`${BASE_URL}/songs/${songId}`, updateData);
    console.log('✅ Song updated, new rating:', updatedSong.data.data.rating);

    // Test creating a playlist
    console.log('\n7. Testing playlist creation...');
    const playlistData = {
      name: 'My Favorite Rock Songs',
      description: 'A collection of amazing rock songs'
    };
    const createPlaylist = await axios.post(`${BASE_URL}/playlists`, playlistData);
    console.log('✅ Playlist created:', createPlaylist.data.data.name);
    const playlistId = createPlaylist.data.data.id;

    // Test adding song to playlist
    console.log('\n8. Testing add song to playlist...');
    const addToPlaylist = await axios.post(`${BASE_URL}/playlists/${playlistId}/songs/${songId}`);
    console.log('✅ Song added to playlist');

    // Test getting playlist with songs
    console.log('\n9. Testing get playlist with songs...');
    const playlistWithSongs = await axios.get(`${BASE_URL}/playlists/${playlistId}`);
    console.log('✅ Playlist retrieved with', playlistWithSongs.data.data.songs.length, 'songs');

    // Test search functionality
    console.log('\n10. Testing search...');
    const searchResults = await axios.get(`${BASE_URL}/songs/search?q=Bohemian`);
    console.log('✅ Search found', searchResults.data.count, 'results');

    // Test statistics
    console.log('\n11. Testing statistics...');
    const stats = await axios.get(`${BASE_URL}/songs/stats`);
    console.log('✅ Statistics retrieved:', stats.data.data.total_songs, 'total songs');

    // Test getting all playlists
    console.log('\n12. Testing get all playlists...');
    const allPlaylists = await axios.get(`${BASE_URL}/playlists`);
    console.log('✅ Retrieved', allPlaylists.data.count, 'playlists');

    console.log('\n🎉 All tests passed! The API is working correctly.');
    console.log('\n📋 Available endpoints:');
    console.log('   - GET    /api/songs');
    console.log('   - POST   /api/songs');
    console.log('   - GET    /api/songs/:id');
    console.log('   - PUT    /api/songs/:id');
    console.log('   - DELETE /api/songs/:id');
    console.log('   - GET    /api/songs/search?q=query');
    console.log('   - GET    /api/songs/stats');
    console.log('   - GET    /api/playlists');
    console.log('   - POST   /api/playlists');
    console.log('   - GET    /api/playlists/:id');
    console.log('   - PUT    /api/playlists/:id');
    console.log('   - DELETE /api/playlists/:id');
    console.log('   - POST   /api/playlists/:playlistId/songs/:songId');
    console.log('   - DELETE /api/playlists/:playlistId/songs/:songId');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testAPI(); 