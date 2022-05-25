const path = require('path');
const db = require('../db');
const crypto = require('crypto');
const fs = require('fs');

const request = require('./request')

const postApp = (async (req, res, next) => {
    try {
        const file =  req.files.application
        console.log(file)
        const fileName = new Date().getTime().toString() + path.extname(file.name) 
        const savePath = path.join( 'public','uploads', fileName)

        if (file.mimetype !== 'application/vnd.android.package-archive') {
            res.sendStatus(404).json('Only adroid applications are supported')
        }
        
        await file.mv(savePath);


        const fileBuffer = fs.readFileSync(savePath);
        const hash = crypto.createHash('md5')
        const finalHex = hash.update(fileBuffer).digest('hex');
        
        metaData = [{'name': file.name, 'hash': file.md5}]
        const stringData = JSON.stringify(metaData);
        data = [fileName,stringData,finalHex,'en cour de vérification']

        if(finalHex == file.md5){
            await db.insert(data);
            res.status(200).json('application téléversé');
        }else{
            res.sendStatus(400);
            console.log('quelque chose cloche...')
        }

       await request(finalHex);

    } catch (error) {
        console.log(error)
        res.send("Error uploading file")
    }
})

module.exports = postApp