const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/Genre')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const name = req.body.name;
    let genre =  new Genre({ name });
    genre = await genre.save();
    res.send(genre);

});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with that ID could not be found')
    res.json(genre);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const name = req.body.name;
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: { name }
    }, { new: true });

    if (!genre) return res.status(404).send("The genre with that id was not found.");
    
    res.send(genre);
    
});

router.delete('/:id', auth, admin, async (req, res) => {

        const genre = await Genre.findByIdAndRemove(req.params.id);
        if(!genre) return res.status(404).send('The genre with the given ID could not be found')

        res.send((genre));
});


module.exports = router;