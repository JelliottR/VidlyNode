const express = require('express');
const app = express();
app.use(express.json())

const Joi = require('joi');

let genres = ['Action', 'Comedy'];

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/api/genres', (req, res) => {
   res.json(genres) 
});

app.post('/api/genres', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        const name = req.body.name;
        genres.push(name);
        res.send(value);
    });
        
});

// PORT
const port = process.env.PORT || 3000 
app.listen(port, console.log(`Listening on port ${port}`));