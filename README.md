## 🎵Music Tracker API

A local RESTful API which is made by using Node.js, Express.js and SQLite3 that allows users to manage a list of songs and playlists. We can perform tasks like creating,viewing and playing a song, as well as creating, viewing and running a playlist. Optionally includes a basic frontend to interact with the API.

## 📁 Project Structure

📁 MusicTrackerAPI  
├── _tests/  
│   ├── api/  
│   ├── integration/  
│   └── unit/                    
├── controllers/  
│   └── songController.js       
├── routes/  
│   └── songRoutes.js          
├── music.db                   
├── db.js                      
├── server.js                  
├── MusicAPI.html              
├── package.json                
├── coverage/                   
├── .github/workflows/          
├── appss.png  
├── appss2.png       
└── README.md  
              
## 📌 Features

✅ Create, view and play songs and playlists using API  <br>
✅ Local database using SQLite3  <br>
✅ Integrated with DB Browser for SQLite3  <br>
✅ HTML frontend (optional)  <br>
✅ Backend using Node.js and Express.js  <br>
✅ Fully local setup — no external APIs used  <br>

## 🚀 How to Run This Project

1. 📥 Clone the Repository
   `git clone https://github.com/your-username/music-tracker-api.git` <br>
   `cd music-tracker-api`

2. 📦 Install Dependencies
   Node.js (v14 or above)  <br>
→ Required to run the backend server.  <br>
  npm (Node Package Manager)  <br>
  `npm install`  <br>
→ Comes with Node.js. Used to install project dependencies.  <br>

3. ✅ Start the Server  <br>
  Run this command :  <br>
   `node server.js`  <br>
   The server will start at: <br>
   http://localhost:5000  <br>

## 🧠 API Endpoints

GET /api/songs  <br>
Returns all songs in the database.  <br>
Response:  
```json

  {
    "id": 1,
    "title": "Test Song",
    "artist": "Tester",
    "genre": "Rock"
  }
```

POST /api/songs  <br>
Adds a new song to the database.  <br>
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

📌 SQLite Database File: music.db  <br>
🎛️ Managed Using: DB Browser for SQLite  <br>
🛠️ Tables are auto-created on server start (via db.js)  <br>

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

You can open the MusicAPI.html file directly in your browser:  <br>
🔗 Features:  <br>
   1.Add a song using a form  <br>
   2.View all songs in a list  <br>
To use:  <br>
 1.Make sure the server is running.  <br>
 2.Double-click MusicAPI.html to open it in your browser.  <br>
 3.Fill in the form and click “Add Song”.  <br>

## 📬 Sample curl Requests

Add a Song:  
```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \ 
  -d "{\"title\":\"Test Song\", \"artist\":\"Tester\", \"genre\":\"Rock\"}" 


Get All Songs:  
```bash
curl http://localhost:5000/api/songs

## 🛠 Built With

1.Node.js  <br>
2.Express.js  <br>
3.SQLite3  <br>
4.[HTML/CSS/JS] for frontend  <br>

## 📄 License  

This project is open-source and free to use. Feel free to fork and modify for learning or improvement!  
