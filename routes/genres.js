const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Genre = require('../models/Genre')

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, async (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        const name = req.body.name;
        const genre =  new Genre({ name });

        const result = await genre.save();
        res.send(result);

    });
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    res.json(genre);
});

router.put('/:id', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, async (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);
        
        const name = req.body.name;
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            $set: { name }
        }, { new: true });

        if (!genre) return res.status(404).send("The genre with that id was not found.");
        
        res.send(genre);
    });
});

router.delete('/:id', async (req, res) => {

    try{
        await Genre.findByIdAndDelete(req.params.id);
    }catch(ex){
        console.log(ex);
        res.status(400).send('There was a problem deleting the genre.');
    }
});

module.exports = router;