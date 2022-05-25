const express = require('express');

const db = require('../db');

const postApp = require('../controllers/postApp');

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
        const result = await db.one(req.params.id)
        console.log(result);
        if (result.length === 0){
            res.sendStatus(204)
        }
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', postApp)

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
        let description = req.body.description;
        let name = req.body.name;
        let id = req.params.id;

        let data = [name, description, id]

        let result = await db.update(data)
        res.json(result)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})



module.exports = router; 