const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ foo: 'bar' });
});

app.listen(port, () => {
  console.info(`app listening on ${port}`)
});

