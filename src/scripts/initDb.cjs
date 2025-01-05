const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'certificates.db');

const initDb = () => {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
      db.run(`
        CREATE TABLE IF NOT EXISTS certificates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          status TEXT NOT NULL,
          verificationCode TEXT NOT NULL,
          fileUrl TEXT NOT NULL,
          user_id TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table "certificates" created.');
        }
      });
      db.run(`
        CREATE TABLE IF NOT EXISTS certificate_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          certificate_id INTEGER NOT NULL,
          event_type TEXT NOT NULL, -- 'uploaded', 'verified', 'deleted'
          event_time DATETIME NOT NULL,
          FOREIGN KEY (certificate_id) REFERENCES certificates(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating certificate_history table:', err.message);
        } else {
          console.log('Table "certificate_history" created.');
        }
        db.close();
      });
    }
  });
};

initDb();
