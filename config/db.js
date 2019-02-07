const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookSystem'
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;