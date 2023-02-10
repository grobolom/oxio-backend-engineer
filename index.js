const express = require('express');
const routes = require('./src/routes')

const app = express();
const port = process.env.PORT || 3000;

// ensure we can parse JSON requests
app.use(express.json())
app.use('/v1', routes);

app.listen(port, () => {
  console.info(`app listening on ${port}`);
});

