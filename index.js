 
// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const app = express();
// const cors = require('cors')
// app.use(cors())
// const PORT = 5000;

 
// const db = new sqlite3.Database('database.db');
// db.serialize(() => {
//   db.run("CREATE TABLE  IF NOT EXISTS vehicle (latitude REAL, longitude REAL, timestamp TEXT)");
//   const stmt = db.prepare("INSERT INTO vehicle VALUES (?, ?, ?)");

   
//   const dummyData = [
//     { latitude: 17.385044, longitude: 78.486671, timestamp: "2024-07-20T10:00:00Z" },
//     { latitude: 17.385045, longitude: 78.486672, timestamp: "2024-07-20T10:00:05Z" },
     
//   ];

//   dummyData.forEach(({ latitude, longitude, timestamp }) => {
//     stmt.run(latitude, longitude, timestamp);
//   });

//   stmt.finalize();
// });

// app.get('/api/vehicle', (req, res) => {
//   db.all("SELECT * FROM vehicle", (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS vehicle (latitude REAL, longitude REAL, timestamp TEXT)");

  const stmt = db.prepare("INSERT INTO vehicle (latitude, longitude, timestamp) VALUES (?, ?, ?)");

  // Dummy data
  const dummyData = [
    { latitude: 17.385044, longitude: 78.486671, timestamp: "2024-07-20T10:00:00Z" },
    { latitude: 17.3850445, longitude: 78.486672, timestamp: "2024-07-20T10:00:05Z" },
    { latitude: 17.385045, longitude: 78.486673, timestamp: "2024-07-20T10:00:10Z" },
    // Add more data as needed
  ];

  dummyData.forEach(({ latitude, longitude, timestamp }) => {
    stmt.run(latitude, longitude, timestamp);
  });

  stmt.finalize();
});

app.get('/api/vehicle', (req, res) => {
  db.all("SELECT * FROM vehicle ORDER BY timestamp ASC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
