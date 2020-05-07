const express = require('express');
const bodyParser = require('body-parser');


// We can call multiple route files here, and just set them up for express further down
// 
const orgroutes = require('./routes/api');
const routes = require('./routes/api');

const path = require('path');


const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// Adding our routes to express
app.use('/api', routes);
app.use('/api', routes);

app.use((err, req, res, next) => {
  res.send('Welcome to Express');
});

app.listen(port, () => {
    console.log('running');
    console.log(`Server running on port ${port}`)
});