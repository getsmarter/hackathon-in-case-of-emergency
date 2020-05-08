const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNo: String,
    email: String,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
