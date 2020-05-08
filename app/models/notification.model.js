const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    message: String,
    messageType: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
