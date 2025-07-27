# 🎵 Music Tracker API

A RESTful API for tracking music and managing playlists built with Node.js, Express, and SQLite.

## ✨ Features

- **Song Management**: CRUD operations for songs with metadata
- **Playlist Management**: Create, update, and manage playlists
- **Search & Filter**: Search songs by title, artist, album, or genre
- **Statistics**: Get comprehensive music library statistics
- **RESTful Design**: Clean, consistent API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **Security**: Helmet.js for security headers
- **Logging**: Request logging with Morgan

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MusicTrackerAPI
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently, the API doesn't require authentication. All endpoints are publicly accessible.

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🎵 Songs API

### Get All Songs
```http
GET /api/songs
```

**Query Parameters:**
- `genre` (optional): Filter by genre
- `artist` (optional): Filter by artist
- `album` (optional): Filter by album
- `limit` (optional, default: 50): Number of songs to return
- `offset` (optional, default: 0): Number of songs to skip

**Example:**
```bash
curl "http://localhost:5000/api/songs?genre=rock&limit=10"
```

### Get Song by ID
```http
GET /api/songs/:id
```

### Create Song
```http
POST /api/songs
```

**Request Body:**
```json
{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "genre": "Rock",
  "duration": 354,
  "year": 1975,
  "rating": 5
}
```

**Required Fields:**
- `title`: Song title
- `artist`: Artist name

**Optional Fields:**
- `album`: Album name
- `genre`: Music genre
- `duration`: Duration in seconds
- `year`: Release year
- `rating`: Rating (1-5)

### Update Song
```http
PUT /api/songs/:id
```

### Delete Song
```http
DELETE /api/songs/:id
```

### Search Songs
```http
GET /api/songs/search?q=search_term
```

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional, default: 20): Number of results

### Get Song Statistics
```http
GET /api/songs/stats
```

Returns:
- Total number of songs
- Unique artists count
- Unique albums count
- Unique genres count
- Average rating
- Average duration

## 📋 Playlists API

### Get All Playlists
```http
GET /api/playlists
```

**Query Parameters:**
- `limit` (optional, default: 50): Number of playlists to return
- `offset` (optional, default: 0): Number of playlists to skip

### Get Playlist by ID
```http
GET /api/playlists/:id
```

Returns playlist details with all songs included.

### Create Playlist
```http
POST /api/playlists
```

**Request Body:**
```json
{
  "name": "My Favorite Rock Songs",
  "description": "A collection of my favorite rock songs"
}
```

**Required Fields:**
- `name`: Playlist name

**Optional Fields:**
- `description`: Playlist description

### Update Playlist
```http
PUT /api/playlists/:id
```

### Delete Playlist
```http
DELETE /api/playlists/:id
```

### Add Song to Playlist
```http
POST /api/playlists/:playlistId/songs/:songId
```

**Request Body (optional):**
```json
{
  "position": 1
}
```

### Remove Song from Playlist
```http
DELETE /api/playlists/:playlistId/songs/:songId
```

### Reorder Playlist Songs
```http
PUT /api/playlists/:playlistId/reorder
```

**Request Body:**
```json
{
  "songOrders": [
    { "songId": 1, "position": 1 },
    { "songId": 2, "position": 2 },
    { "songId": 3, "position": 3 }
  ]
}
```

## 🛠️ Development

### Project Structure
```
MusicTrackerAPI/
├── config/
│   └── config.js          # Configuration settings
├── controllers/
│   ├── songController.js   # Song business logic
│   └── playlistController.js # Playlist business logic
├── database/
│   └── db.js              # Database connection and helpers
├── middleware/
│   └── errorHandler.js    # Error handling middleware
├── routes/
│   ├── songRoutes.js      # Song API routes
│   └── playlistRoutes.js  # Playlist API routes
├── data/                  # Database files (auto-created)
├── server.js              # Main application file
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

### Available Scripts

```bash
# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_PATH=./data/music.db

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🧪 Testing

The project includes Jest for testing. Run tests with:

```bash
npm test
```

For coverage report:
```bash
npm test -- --coverage
```

## 📊 Database Schema

### Songs Table
```sql
CREATE TABLE songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  genre TEXT,
  duration INTEGER,
  year INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Playlists Table
```sql
CREATE TABLE playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Playlist_Songs Junction Table
```sql
CREATE TABLE playlist_songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_id INTEGER NOT NULL,
  song_id INTEGER NOT NULL,
  position INTEGER DEFAULT 0,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (playlist_id) REFERENCES playlists (id) ON DELETE CASCADE,
  FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE,
  UNIQUE(playlist_id, song_id)
);
```

## 🔧 Configuration

The application uses a centralized configuration system in `config/config.js`. Key settings include:

- **Port**: Server port (default: 5000)
- **Database Path**: SQLite database file location
- **CORS**: Cross-origin resource sharing settings
- **Environment**: Development/production mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Happy coding! 🎵**










