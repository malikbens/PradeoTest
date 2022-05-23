const express = require('express');
const fileUpload = require('express-fileupload');


const crypto = require('crypto');
const fs = require('fs');

const fileBuffer = fs.readFileSync('C:/Users/Malik/workflow/Pradeo/server/public/uploads/1653264536468.apk');

const hash = crypto.createHash('md5')
const finalHex = hash.update(fileBuffer).digest('hex');

console.log(finalHex)



const apiRouter = require('./routes');

const app = express();
const port = 5000

app.use(express.json());
app.use(fileUpload())

app.use('/api/apps', apiRouter)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})

