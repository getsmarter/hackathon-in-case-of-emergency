const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;

/** DATABASE CONNEECTION */
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
// We can call multiple route files here, and just set them up for express further down
// 

/** APP ROUTES */
const orgRoutes = require('./routes/organization.routes');
const userOrganizationRoutes = require('./routes/userOrganization.routes');
const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');
const crewMemberRoutes = require('./routes/crewMember.routes');
const signupRoutes = require('./routes/signup.routes');
const teamRoutes = require('./routes/team.routes');
const routes = require('./routes/api');

const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Adding our routes to express
app.use('/api', routes);
app.use('/api', orgRoutes);
app.use('/api', noteRoutes);
app.use('/api', userRoutes);
app.use('/api', crewMemberRoutes);
app.use('/api', signupRoutes);
app.use('/api', userOrganizationRoutes);
app.use('/api', teamRoutes);

app.listen(port, () => {
  console.log('running');
  console.log(`Server running on port ${port}`)
});