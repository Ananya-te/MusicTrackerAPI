# 🎵 Music Tracker API

A simple Node.js + SQLite3 project to manage a list of songs using RESTful APIs. Optionally includes a basic frontend to interact with the API.

## 📁 Project Structure

```
📦 Music Tracker API
├── controllers/
│   └── songController.js
├── routes/
│   └── songRoutes.js
├── db.js
├── music.db
├── server.js
├── MusicAPI.html (optional frontend)
└── README.md
```

## 📌 Features

- ✅ Create, Read songs using API
- ✅ Local database using SQLite
- ✅ Integrated with DB Browser for SQLite
- ✅ HTML frontend (optional)
- ✅ Fully local setup — no external APIs used

## 🚀 How to Run This Project

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/your-username/music-tracker-api.git
cd music-tracker-api
```

### 2. 📦 Install Dependencies

Make sure you have Node.js installed, then:

```bash
npm install
```

### 3. ✅ Start the Server

```bash
node server.js
```

The server will start at: **http://localhost:5000**

## 🧠 API Endpoints

### GET /api/songs
Returns all songs in the database.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Test Song",
    "artist": "Tester",
    "genre": "Rock"
  }
]
```

### POST /api/songs
Adds a new song to the database.

**Request Body:**
```json
{
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}
```

## 🗃️ Database Used

- 📌 **SQLite Database File:** `music.db`
- 🎛️ **Managed Using:** DB Browser for SQLite
- 🛠️ **Tables are auto-created** on server start (via `db.js`)

### 🎼 Table Schema:
```sql
CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  genre TEXT
);
```

## 🌐 Frontend

You can open the `MusicAPI.html` file directly in your browser.

### 🔗 Features:
1. Add a song using a form
2. View all songs in a list

### To use:
1. Make sure the server is running
2. Double-click `MusicAPI.html` to open it in your browser
3. Fill in the form and click "Add Song"

## 📬 Sample curl Requests

### Add a Song:
```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Song\", \"artist\":\"Tester\", \"genre\":\"Rock\"}"
```

### Get All Songs:
```bash
curl http://localhost:5000/api/songs
```

## 🛠 Built With

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **HTML/CSS/JS** - Frontend

## 📄 License

This project is open-source and free to use. Feel free to fork and modify for learning or improvement!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

⭐ **Don't forget to star this repository if you found it helpful!**