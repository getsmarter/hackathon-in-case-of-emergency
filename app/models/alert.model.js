const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
    name: String,
    message: String,
    timeEnded: Date,
    incident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    endedBy: {
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

module.exports = mongoose.model('Alert', AlertSchema);
