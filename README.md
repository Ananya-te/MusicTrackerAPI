## 🎵Music Tracker API

A local RESTful API which is made by using Node.js, Express.js and SQLite3 that allows users to manage a list of songs and playlists. We can perform tasks like creating,viewing and playing a song, as well as creating, viewing and running a playlist. Optionally includes a basic frontend to interact with the API.

## 📁 Project Structure

📁 MusicTrackerAPI  
├── _tests/  
│   ├── api/  
│   ├── integration/  
│   └── unit/                  # All test files for different layers  
├── controllers/  
│   └── songController.js      # Handles song-related logic  
├── routes/  
│   └── songRoutes.js          # Defines API endpoints for songs/playlists  
├── music.db                   # SQLite3 database file  
├── db.js                      # Database connection setup  
├── server.js                  # Entry point for the Express server  
├── MusicAPI.html              # Optional HTML frontend  
├── package.json               # Project dependencies and scripts  
├── coverage/                  # Auto-generated test coverage reports  
├── .github/workflows/         # GitHub CI/CD workflow config  
├── appss.png, appss2.png      # Screenshots / image assets  
└── README.md                  # Project documentation

## 📌 Features

✅ Create, view and play songs and playlists using API
✅ Local database using SQLite3
✅ Integrated with DB Browser for SQLite3
✅ HTML frontend (optional)
✅ Backend using Node.js and Express.js
✅ Fully local setup — no external APIs used

## 🚀 How to Run This Project

1. 📥 Clone the Repository
   `git clone https://github.com/your-username/music-tracker-api.git`
   `cd music-tracker-api`

2. 📦 Install Dependencies
   Node.js (v14 or above)
→ Required to run the backend server.
  npm (Node Package Manager) 
  `npm install`
→ Comes with Node.js. Used to install project dependencies.

3. ✅ Start the Server
  Run this command :
   `node server.js`
   The server will start at:
   http://localhost:5000

## 🧠 API Endpoints

GET /api/songs
Returns all songs in the database.
Response:
```json

  {
    "id": 1,
    "title": "Test Song",
    "artist": "Tester",
    "genre": "Rock"
  }
```

POST /api/songs
Adds a new song to the database.
Request Body:
```json
{
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}
```

Response:
```json
{
  "id": 2,
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}
```

## 🗃️ Database Used

📌 SQLite Database File: music.db
🎛️ Managed Using: DB Browser for SQLite
🛠️ Tables are auto-created on server start (via db.js)

## 🎼 Table Schema:

```sql
CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  genre TEXT
);
```

## 🌐 Frontend

You can open the MusicAPI.html file directly in your browser:
🔗 Features:
   1.Add a song using a form
   2.View all songs in a list
To use:
 1.Make sure the server is running.
 2.Double-click MusicAPI.html to open it in your browser.
 3.Fill in the form and click “Add Song”.

## 📬 Sample curl Requests

* Add a Song:
Do:
```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Song\", \"artist\":\"Tester\", \"genre\":\"Rock\"}"


* Get All Songs:
```bash
curl http://localhost:5000/api/songs

## 🛠 Built With

1.Node.js
2.Express.js
3.SQLite3
4.[HTML/CSS/JS] for frontend

## 📄 License

This project is open-source and free to use. Feel free to fork and modify for learning or improvement!
