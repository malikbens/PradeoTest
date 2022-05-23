const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'pradeo',
    host: 'localhost'
});

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