


<p align="center">
  <img src="appss.png" alt="Music Tracker API Screenshot" width="400"/>
</p>

# 🎵 Music Tracker API

<p align="center">
  <b>A simple, beginner-friendly Node.js + SQLite3 RESTful API to manage your music collection. Includes an optional HTML frontend for easy interaction.</b>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/github/stars/Salusha/MusicTrackerAPI?style=social" alt="GitHub stars"></a>
  <a href="#"><img src="https://img.shields.io/github/license/Salusha/MusicTrackerAPI" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/github/last-commit/Salusha/MusicTrackerAPI" alt="Last Commit"></a>
</p>

---

## 📚 Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Frontend](#frontend)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ Features

- Create and read songs using a RESTful API
- Local database using SQLite
- Tables auto-created on server start
- Integrated with DB Browser for SQLite
- Optional HTML frontend
- Fully local setup — no external APIs used

---

## 📸 Screenshots

<p align="center">
  <img src="appss2.png" alt="API Screenshot" width="400"/>
  <img src="serverss.png" alt="Server Screenshot" width="400"/>
  <img src="SQlitess.png" alt="SQLite Screenshot" width="400"/>
</p>

---

## 📁 Project Structure

```text
MusicTrackerAPI/
├── controllers/
│   └── songController.js
├── routes/
│   └── songRoutes.js
├── db.js
├── music.db
├── server.js
├── MusicAPI.html (optional frontend)
├── README.md
└── _tests_/
    ├── api/
    ├── integration/
    └── Unit/
```

---

## �️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/music-tracker-api.git
   cd music-tracker-api
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Start the Server**
   ```bash
   node server.js
   ```
   The server will start at: [http://localhost:5000](http://localhost:5000)

---

## 🚀 Usage

You can interact with the API using tools like [Postman](https://www.postman.com/) or `curl`, or use the provided HTML frontend.

### Sample curl Requests

**Add a Song:**
```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Song\", \"artist\":\"Tester\", \"genre\":\"Rock\"}"
```

**Get All Songs:**
```bash
curl http://localhost:5000/api/songs
```

---

## 📬 API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/songs       | Get all songs            |
| POST   | /api/songs       | Add a new song           |

**GET /api/songs**

Returns all songs in the database.

**Response:**
```json
{
  "id": 1,
  "title": "Test Song",
  "artist": "Tester",
  "genre": "Rock"
}
```

**POST /api/songs**

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

---

## 🗃️ Database

- **SQLite Database File:** `music.db`
- **Managed Using:** [DB Browser for SQLite](https://sqlitebrowser.org/)
- **Tables auto-created on server start (via `db.js`):**

```sql
CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  genre TEXT
);
```

---

## 🌐 Frontend

You can open the `MusicAPI.html` file directly in your browser.

**Features:**
1. Add a song using a form
2. View all songs in a list

**To use:**
1. Make sure the server is running.
2. Double-click `MusicAPI.html` to open it in your browser.
3. Fill in the form and click “Add Song”.

---

## 🧰 Tech Stack

| Technology   | Description                |
|--------------|----------------------------|
| Node.js      | JavaScript runtime         |
| Express.js   | Web framework              |
| SQLite3      | Lightweight SQL database   |
| HTML/CSS/JS  | Frontend (optional)        |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details (or create one if it doesn't exist).

---

## � License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 👤 Author

**Owner:** Ananya  
GitHub: [Ananya-te](https://github.com/Ananya-te)
1. 📥 Clone the Repository
   bash
   git clone https://github.com/your-username/music-tracker-api.git
   cd music-tracker-api

2. 📦 Install Dependencies
   Make sure you have Node.js installed, then:
   bash
   npm install

3. ✅ Start the Server
   bash
   node server.js
   The server will start at:
   http://localhost:5000

🧠 API Endpoints
GET /api/songs
Returns all songs in the database.
Response:
json

  {
    "id": 1,
    "title": "Test Song",
    "artist": "Tester",
    "genre": "Rock"
  }


POST /api/songs
Adds a new song to the database.
Request Body:
json
{
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}

Response:
json
{
  "id": 2,
  "title": "Shape of You",
  "artist": "Ed Sheeran",
  "genre": "Pop"
}

🗃️ Database Used
📌 SQLite Database File: music.db
🎛️ Managed Using: DB Browser for SQLite
🛠️ Tables are auto-created on server start (via db.js)

🎼 Table Schema:
sql
CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  genre TEXT
);

🌐 Frontend
You can open the MusicAPI.html file directly in your browser:
🔗 Features:
   1.Add a song using a form
   2.View all songs in a list
To use:
 1.Make sure the server is running.
 2.Double-click MusicAPI.html to open it in your browser.
 3.Fill in the form and click “Add Song”.

📬 Sample curl Requests
Add a Song:
bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Song\", \"artist\":\"Tester\", \"genre\":\"Rock\"}"

Get All Songs:
bash
curl http://localhost:5000/api/songs

🛠 Built With
1.Node.js
2.Express.js
3.SQLite3
4.[HTML/CSS/JS] for frontend

📄 License
This project is open-source and free to use. Feel free to fork and modify for learning or improvement!










