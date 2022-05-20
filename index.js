const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 5000

app.set('view engine', 'ejs')

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true
}))

app.get('/', async (req, res, next) => {
    res.render("index")
})

app.post('/single', async(req, res, next) => {
    try {
        const file = req.files.mFile;
        console.log(file);
        const fileName = new Date().getTime().toString()+path.extname(file.name);
        const savePath = path.join(__dirname, 'public','uploads', fileName);
        if(file.mimetype !== 'application/vnd.android.package-archive'){
            throw new Error('Only adroid applications are supported')
        }
        await file.mv(savePath);
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
        res.send("Error uploading file")
    }
})

app.post('/multiple', async (req, res, next) => {
    try {
        const files = req.files.mFiles;
        const promises = files.map(file => {
            const savePath = path.join(__dirname,'public','uploads',file.name)
            return file.mv(savePath)
        })

        await Promise.all(promises);
        res.redirect('/')

    } catch (error){

    }
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
  })