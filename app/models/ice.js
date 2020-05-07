const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IceSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The todo text field is required']
  }
})

//create model for ice
const Todo = mongoose.model('ice', IceSchema);

module.exports = Ice;
