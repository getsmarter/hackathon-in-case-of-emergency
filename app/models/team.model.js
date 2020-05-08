const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    shortName: String,
    fullName: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    meetingArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MeetingArea'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);
