const mysql = require('mysql');


const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
})

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = ("CREATE TABLE IF NOT EXISTS files (id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255))");
//   db.query("CREATE DATABASE IF NOT EXISTS pradeo;", function (err, result) { 
//       if (err) throw err;
//       console.log("Database created");
//       db.query("USE pradeo;", function (err, results) {
//           if (err) throw err;
//           console.log("Database connected");
//       });
//       db.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("Table created");
//       })
//   });
// });

// db.connect(function(err){
//   if (err) throw err;
//   console.log('Connected');
// });

module.exports = db;