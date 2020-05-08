const mongoose = require('mongoose');

const UserOrganizationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    admin: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('UserOrganization', UserOrganizationSchema);
