const mongoose = require('mongoose');

const MeetingAreaSchema = mongoose.Schema({
    name: String,
    parkingLot: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MeetingArea', MeetingAreaSchema);
