const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'pradeo',
    host: 'localhost'
});

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

let appsdb = {};

appsdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM applications`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM applications WHERE id = ?`, id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.insert = (data) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO `applications`(`name`,`datas`,`hash`, `status`) VALUES (?,?,?, ?)", data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM applications WHERE id = ?", id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })
    })
};

appsdb.update = (data) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE applications SET  name = ?, description = ? WHERE id = ?  ", data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })

    })
};

appsdb.updateStatus = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE applications SET status = ? WHERE hash = ? ', data,  (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result)  
        })
    }) 
}

module.exports = appsdb;