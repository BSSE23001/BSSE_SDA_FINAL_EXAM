const bookRoutes = require('./routes/book');

const express = require('express');

const app = express();

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static('public'));

app.use('/api/books', bookRoutes);

module.exports = app;