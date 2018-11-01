const express = require('express');
const app = express();

let genres = ['Action', 'Comedy'];

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/api/genres', (req, res) => {
   res.json(genres) 
});

app.post('/api/genres', (req, res) => {
    const name = req.body.name;
    
});

// PORT
const port = process.env.PORT || 3000 
app.listen(port, console.log(`Listening on port ${port}`));