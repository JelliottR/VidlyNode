const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    mongoose.connect(config.get('db'), { useNewUrlParser: true })
        .then(console.log(`Connected to ${config.get('db')}...`));
}; 