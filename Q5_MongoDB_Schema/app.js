const productRoutes = require('./routes/product');

const express = require('express');

const app = express();

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use('/api/products', productRoutes);

module.exports = app;