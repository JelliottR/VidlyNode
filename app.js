// process.env.NODE_ENV = 'production';

const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const config = require('config');
const genres = require('./routes/genres');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
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