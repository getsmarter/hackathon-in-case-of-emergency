const mongoose = require('mongoose');

const EmergencyContactSchema = mongoose.Schema({
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

module.exports = mongoose.model('EmergencyContact', EmergencyContactSchema);
