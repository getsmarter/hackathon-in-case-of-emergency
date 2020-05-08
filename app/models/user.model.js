const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  cellNo: String,
  emailAddress: String,
  team_id: String
});

//create model for organisation
const User = mongoose.model('User', UserSchema);

module.exports = User;
