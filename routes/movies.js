const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/Movie')
const { Genre } = require('../models/Genre')

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('The genre with that ID could not be found')

    let movie = new Movie( {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    } );

    movie = await movie.save();
    res.send(movie);

});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with that ID could not be found')
    res.json(movie);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('The genre with that ID could not be found')

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if (!movie) return res.status(404).send("The movie with that id was not found.");

    res.send(movie);

});

router.delete('/:id', async (req, res) => {

    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID could not be found')

    res.send((movie));
});

module.exports = router;