// process.env.NODE_ENV = 'production';

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const config = require('config');
const app = express();

app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

const Joi = require('joi');

let genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Comedy'}
];

app.get('/', (req, res) => {
    res.render('index', {title:'Title',message:'get fucked!'});
});

app.get('/api/genres', (req, res) => {
   res.json(genres);
});

app.post('/api/genres', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        const name = req.body.name;
        if(genres.find(g => g.name == name)){
            return res.status(404).send("Genre already exists.")
        }

        const newGenre = {id: genres.length + 1, name};
        genres.push(newGenre);
        res.send(genres);
                
    });
});

app.put('/api/genres', (req, res) => {
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        let genre = genres.find(genre => genre.id == req.body.id);
        if(!genre) return res.status(404).send("The genre was not found.");

        genre.name = req.body.name;
        res.send(genres);
    });
});

app.delete('/api/genres', (req, res) => {
    const schema = {
        id: Joi.number().required(),
    };

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        let genre = genres.find(genre => genre.id == req.body.id);
        if (!genre) return res.status(404).send("The genre was not found.");

        const index = genres.indexOf(genre);
        genres.splice(index, 1);
        res.send(genres);
    });

});

// PORT
const port = process.env.PORT || 3000 
app.listen(port, console.log(`Listening on port ${port}`));