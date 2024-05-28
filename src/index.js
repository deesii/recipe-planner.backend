const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const app = express();

const port = 3000;

connectDB();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
