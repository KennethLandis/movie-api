const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movies.json')

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
    res.send('Successful test')
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log('Server listening at port 8000')
})