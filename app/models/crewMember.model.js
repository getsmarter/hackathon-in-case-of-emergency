const mongoose = require('mongoose');

const CrewMemberSchema = mongoose.Schema({
    speciality: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CrewMember', CrewMemberSchema);
