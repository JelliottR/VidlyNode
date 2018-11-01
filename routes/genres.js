const express = require('express');
const router = express.Router();
const Joi = require('joi');

let genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' }
];

router.get('/', (req, res) => {
    res.json(genres);
});

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        const name = req.body.name;
        if (genres.find(g => g.name == name)) {
            return res.status(404).send("Genre already exists.")
        }

        const newGenre = { id: genres.length + 1, name };
        genres.push(newGenre);
        res.send(genres);

    });
});

router.put('/', (req, res) => {
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema, (err, value) => {
        if (err) return res.status(400).send(err.details[0].message);

        let genre = genres.find(genre => genre.id == req.body.id);
        if (!genre) return res.status(404).send("The genre was not found.");

        genre.name = req.body.name;
        res.send(genres);
    });
});

router.delete('/', (req, res) => {
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

module.exports = router;