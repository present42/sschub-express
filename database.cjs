require('dotenv').config();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
    // host: 'localhost',
    // user: 'root',
    // password: 'password',
    // database: 'hello'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = conn;
