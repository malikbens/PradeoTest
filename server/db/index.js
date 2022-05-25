const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
  })

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = ("CREATE TABLE IF NOT EXISTS applications (id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255), status VARCHAR(50), hash VARCHAR(32), metadatas json)");
  db.query("CREATE DATABASE IF NOT EXISTS pradeo;", function (err, result) { 
      if (err) throw err;
      
      db.query("USE pradeo;", function (err, results) {
          if (err) throw err;
          
      });
      db.query(sql, function (err, result) {
          if (err) throw err;
          
      })
  });
});

let appsdb = {};

appsdb.all = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM applications`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.one = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM applications WHERE id = ?`, id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.insert = (data) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO `applications`(`name`,`metadatas`,`hash`, `status`) VALUES (?,?,?, ?)", data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM applications WHERE id = ?", id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })
    })
};

appsdb.update = (data) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE applications SET  name = ?, description = ? WHERE id = ?  ", data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })

    })
};

appsdb.updateStatus = (data) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE applications SET status = ? WHERE hash = ? ', data,  (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result)  
        })
    }) 
}

module.exports = appsdb;