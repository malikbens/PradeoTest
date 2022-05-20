const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const package = require('./package.json');
const mysql = require('mysql');


const port = process.env.PORT || 5000;
const apiRoot = '/api';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/locahost/
}));
app.options('*', cors());

// configure routes
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`${package.name} -v${package.version}`);
});

// register routes
app.use(apiRoot, router);

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

// connect to MySQL
db.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    const sql = ("CREATE TABLE IF NOT EXISTS users_file (id INT(10) NOT NULL AUTO_INCREMENT, file_src TEXT, PRIMARY KEY(id))");
    db.query("CREATE DATABASE IF NOT EXISTS pradeo;", function(err, result) {
        if (err) throw err;
        console.log("Database created");
        db.query("USE pradeo;", function(err, results){
            console.log("Database connected");
        });
        db.query(sql, function(err, result){
            if (err) throw err ;
            console.log("Table created");
        })
    });
});

app.listen(port, () => {
    console.log('Server is up !')
});