const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  title: String,
  content: String
});

//create model for organisation
const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;