const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log', level: 'info' }));
// winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/Vidly', options: { useNewUrlParser: true }, level: 'info' }));

winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
    new winston.transports.Console()
);