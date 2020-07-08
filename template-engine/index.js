const express = require('express');
const expressJSX = require('./express-jsx');

const app = express();

app.engine('jsx', expressJSX);

app.set('views', './views') // specify the views directory
app.set('view engine', 'jsx') // register the template engine

app.get('/', (req, res) => {
  res.render('index', {'hello': 'hola', 'world': 'mundo'})
})

const server = app.listen(3000, () => {
  console.log(`I\'m listening you http://localhost:${server.address().port}`)
})