const mongoose = require('mongoose');

const AlertCheckInSchema = mongoose.Schema({
    message: String,
    status: {
        type: String,
        enum: ['outOfOffice', 'safeAtDesignatedArea', 'other']
    },
    checkedIn: Boolean,
    alert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    meetingArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MeetingArea'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AlertCheckIn', AlertCheckInSchema);
