// process.env.NODE_ENV = 'production';

require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

process.on('uncaughtException', (ex)=>{
    console.log('UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex)
})

winston.add(new winston.transports.File( {filename: 'logfile.log'} ));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/Vidly', level:'error'}));

app.set('view engine', 'pug');

throw new Error('Something failed during startup.');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);


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

app.get('/', (req, res) => {
    res.render('index', { title: 'Title of Tab', message: 'Hello World!' });
});

// PORT
const port = process.env.PORT || 3000 
app.listen(port, console.log(`Listening on port ${port}`));