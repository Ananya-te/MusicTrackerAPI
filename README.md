# 🎵 Music Tracker API

A simple yet powerful RESTful API built with **Node.js** and **SQLite** that lets users manage a list of songs. It supports adding, retrieving, and storing songs locally, with an optional frontend for browser-based interaction.

## 📁 Project Structure

```
MusicTrackerAPI/
├── controllers/         # Contains logic to handle API requests
│   └── songController.js
├── routes/              # Defines API endpoints and routing
│   └── songRoutes.js
├── music.db             # SQLite database file
├── db.js                # Database connection and setup
├── server.js            # Main server file to run the API
├── MusicAPI.html        # Optional HTML frontend for testing API
└── README.md            # Project documentation
```
## 🚀 Features

- 🎧 Add and retrieve songs using REST APIs
- 🗃️ Local database using **SQLite**
- 📊 Easy integration with **DB Browser for SQLite**
- 🌐 Optional HTML frontend to view/add songs via a form
- 🔒 Fully local — no external APIs or cloud services

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com//music-tracker-api.git
cd music-tracker-api
```

###2. Install Dependencies

Ensure you have Node.js installed, then run:
```bash

npm install
```

###3. Start the Server
```bash

node server.js

The server will start at: http://localhost:5000
```


## 🔌 API Endpoints

📥 Add a Song
```bash

POST /api/songs
```

Request Body:
```bash
Json

{
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}
```

📤 Get All Songs
```bash
GET /api/songs
```

## Response:
```bash
json

[
  {
    "id": 1,
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "genre": "Pop"
  }
]
```


## 🧪 Database Schema
```bash
SQL

CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  genre TEXT
);
```

Managed with: db.js

Uses local file: music.db

Tables are created automatically on server start


## 🌐 Optional Frontend Usage

Open MusicAPI.html in your browser to:

1. View all songs in a list

2. Add songs via a simple form

Make sure your server is running before using the frontend.


## 🛠️ Tech Stack

> Node.js

> Express.js

> SQLite3

> HTML, CSS, JavaScript for UI


## 🤝 Contributing

We welcome contributions! 💛

1. Fork this repo

2. Create a new branch: feature/your-feature-name

3. Make your changes and commit

4. Open a Pull Request with a meaningful description

## License

This project is open-source and free to use, modify, or improve.
Let's build something awesome! 🚀









