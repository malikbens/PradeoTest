const express = require('express');
const fileUpload = require('express-fileupload');

const apiRouter = require('./routes');

const path = require('path');

const app = express();
const port = 5000

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true
}))

app.use('/api/apps', apiRouter)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})