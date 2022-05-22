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
        pool.query(`SELECT * FROM files`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM files WHERE id = ?`, id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result[0]);
        })
    })

};

appsdb.insert = (app) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO `files`(`FILE`) VALUES (?)", app, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
};

appsdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM files WHERE id = ?", id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })
    })
};

appsdb.update = (data) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE files SET description = ?, name = ? WHERE id = ?  ", data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        })

    })
};

module.exports = appsdb;