const express = require('express');
const path = require('path');

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await db.all();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let result = await db.one(req.params.id)
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const file = req.files.application
        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join( 'public','uploads', fileName)
        console.log(file)

        if (file.mimetype !== 'application/vnd.android.package-archive') {
            res.send('Only adroid applications are supported')
        }

        await file.mv(savePath);
        await db.insert(fileName);

        res.json({message: 'application téléversé'});
    } catch (error) {
        console.log(error)
        res.send("Error uploading file")
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let result = await db.delete(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.put('/:id', async (req, res) => {
    try { 
        let desc = req.body.desc;
        let name = req.body.name;
        let id = req.params.id;
        let data = [desc, name, id]
        let result = await db.update(data)
        res.json(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router; 