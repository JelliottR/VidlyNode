const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = {
    name: {
        type: String,
        required: 'A genre must have a name',
        min: 5
    }
};

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, schema);
};

const Genre = mongoose.model('Genre', genreSchema);

exports.genreSchema = genreSchema
exports.Genre = Genre;
exports.validate = validateGenre;