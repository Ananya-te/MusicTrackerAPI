const SpotifyWebApi = require('spotify-web-api-node');

// Helper to get a Spotify API client for the current user
function getSpotifyApi(req) {
  if (!req.user || !req.user.spotify_access_token) {
    throw new Error('No Spotify access token for user');
  }
  return new SpotifyWebApi({
    accessToken: req.user.spotify_access_token
  });
}

exports.getCurrentTrack = async (req, res) => {
  try {
    const spotifyApi = getSpotifyApi(req);
    const data = await spotifyApi.getMyCurrentPlaybackState();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const spotifyApi = getSpotifyApi(req);
    const data = await spotifyApi.getUserPlaylists();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLikedSongs = async (req, res) => {
  try {
    const spotifyApi = getSpotifyApi(req);
    const data = await spotifyApi.getMySavedTracks();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 