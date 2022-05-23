const path = require('path');
const db = require('../db');
const crypto = require('crypto');
const fs = require('fs');

const request = require('../controllers/request')


const postApp = (async (req, res, next) => {
    try {
        let file =  req.files.application
        let fileName = new Date().getTime().toString() + path.extname(file.name)
        let savePath = path.join( 'public','uploads', fileName)
        if (file.mimetype !== 'application/vnd.android.package-archive') {
            res.send('Only adroid applications are supported')
        }
        
        await file.mv(savePath);

        const fileBuffer = fs.readFileSync(savePath);
        const hash = crypto.createHash('md5')
        const finalHex = hash.update(fileBuffer).digest('hex');
        
        metaData = [{'name': file.name, 'hash': file.md5}]
        const stringData = JSON.stringify(metaData);
        data = [fileName,stringData,finalHex]

        await db.insert(data);
        res.status(200).json('application téléversé');

        request(finalHex);

    } catch (error) {
        console.log(error)
        res.send("Error uploading file")
    }
})


module.exports = postApp