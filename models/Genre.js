const mongoose = require('mongoose');

const genreSchema = {
    name: {
        type: String,
        required: 'A genre must have a name',
        min: 2
    }
};

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;