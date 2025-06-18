const userRoutes = require('./routes/user');

const express = require('express');

const app = express();

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use('/api/users', userRoutes);

module.exports = app;