const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);

const server = app.listen(3000, () => {
  console.log(`I\'m listening you http://localhost:${server.address().port}`)
})