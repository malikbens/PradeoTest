const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await db.all();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let result = await db.one(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const file = req.files.application
        if (file.mimetype !== 'application/vnd.android.package-archive') {
            res.send('Only adroid applications are supported')
        }
        await db.insert(file.name);
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