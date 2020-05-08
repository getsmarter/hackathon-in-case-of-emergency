const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
  id: String,
  description: String
});

//create model for organisation
const Organisation = mongoose.model('Organisation', OrganisationSchema);

module.exports = Organisation;
