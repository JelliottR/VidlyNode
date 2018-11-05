const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/Vidly', { useNewUrlParser: true })
        .then(winston.info('Connected to MongoDB'));
}; 