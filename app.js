// process.env.NODE_ENV = 'production';

require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const config = require('config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);

winston.add(new winston.transports.File({
    filename: 'uncaughtExceptions.log',
    handleExceptions: true
}));

process.on('unhandledRejection', (ex) => {
    throw ex;
})

winston.add(new winston.transports.File( {filename: 'logfile.log'} ));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/Vidly', level:'error'}));

app.set('view engine', 'pug');

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/Vidly', { useNewUrlParser: true })
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// PORT
const port = process.env.PORT || 3000 
app.listen(port, console.log(`Listening on port ${port}`));