const express = require('express');
const router = express.Router();
const { Movie } = require('../models/Movie')
const { Customer } = require('../models/Customer');
const { Rental } = require('../models/Rental');
const Fawn = require('fawn');

Fawn.init(require('mongoose'));

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(404).send('The movie with that ID could not be found');

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(404).send('The customer with that ID could not be found');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock')

    const rental = await new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });

    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {$inc: {numberInStock: -1}})
            .run();

            res.send(rental);
    }catch(ex){
        res.status(500).send('Something failed.')
    }
    
});

module.exports = router;