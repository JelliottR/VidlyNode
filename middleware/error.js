const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.err(err.message, err);
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.')
};