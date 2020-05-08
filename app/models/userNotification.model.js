const mongoose = require('mongoose');

const UserNotificationSchema = mongoose.Schema({
    read: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserNotification', UserNotificationSchema);
