const mongoose = require('mongoose');

const IncidentSchema = mongoose.Schema({
    name: String,
    level: Number,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Incident', IncidentSchema);
