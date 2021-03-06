require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const MOVIES = require('./movies.json')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next();

})

app.get('/movie', function getMovies(req, res) {
    response = MOVIES

    
    if(req.query.genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()))
    }

    if(req.query.country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()))
    }    

    if(req.query.avg_vote) {
        tempVote = parseFloat(req.query.avg_vote)
        response = response.filter(movie => movie.avg_vote >= tempVote)
    }

    res.json(response)
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})