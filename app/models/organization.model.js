const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Organization', OrganizationSchema);
