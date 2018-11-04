const mongoose = require('mongoose');
const {genreSchema} = require('./Genre');

const movieSchema = {
    title: {
        type: String,
        required: 'A movie must have a title'
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
};

const Movie = mongoose.model('Movie', movieSchema);

const validateSchema = () => true;

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateSchema;