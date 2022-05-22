const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db')
const path = require('path');
const res = require('express/lib/response');

const app = express();
const port = 5000

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs')

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true
}))

app.get('/', async (req, res, next) => {
    res.render("index")
})

app.get('/applications', async (req, res, next) => {
    var sql = "SELECT * from files";
    db.query(sql, function(err, result, fields){
        if (err) throw err ;
        res.json(result)
    })
})

app.get('applications/:id', async (req, res, next) => {
    var sql = "SELECT * from files WHERE id=?";
    db.query(sql, function(err, result, fields){
        if (err) throw err;
        console.log(id)
    })
})

app.post('/single', async (req, res, next) => {
    try {
        const file = req.files.mFile;
        console.log(file);
        const fileName = new Date().getTime().toString() + path.extname(file.name);
        const hash = file.md5
        const savePath = path.join(__dirname, 'public', 'uploads', fileName);
        if (file.mimetype !== 'application/vnd.android.package-archive') {
            throw new Error('Only adroid applications are supported')
        }
        await file.mv(savePath);

        var sql = "INSERT INTO `files`(`name`) VALUES ('" + fileName + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            return res.json({"message": fileName + " file uploaded","hash": hash});
        });

    } catch (error) {
        console.log(error)
        res.send("Error uploading file")
    }
})

// app.post('/multiple', async (req, res, next) => {
//     try {
//         const files = req.files.mFiles;
//         console.log(files)
//         const promises = files.map(file => {
//             const savePath = path.join(__dirname, 'public', 'uploads', file.name);
//             return file.mv(savePath)
//         })

//         await Promise.all(promises);
//         var sql = "INSERT INTO `files`(`name`) VALUES ('" + files.name + "')";
//         db.query(sql, function (err, result) {
//             if (err) throw err;
//             return res.send("file uploaded");
//         });

//     } catch (error) {
//         console.log(error)
//         res.send("Error uploading file")
//     }
// })

app.listen(port, () => {
    console.log(`running on port ${port}`)
})