// process.env.NODE_ENV = 'production';

const winston = require('winston');
const morgan = require('morgan');
const debug = require('debug')('app:startup');

const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation');

app.set('view engine', 'pug');

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

// PORT
const port = process.env.PORT || 3000 
app.listen(port, winston.info(`Listening on port ${port}`));