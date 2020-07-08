const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send({
    'Hello': 'World',
  });
});

const server = app.listen(3000, () => {
  console.log(`I\'m listening you at http://localhost:${server.address().port}`);
})