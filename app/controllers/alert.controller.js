const Alert = require('../models/alert.model.js');
const AlertCheckin = require('../models/alertCheckin.model.js');
const UserOrganization = require('../models/userOrganization.model.js');
const Notification = require('../models/notification.model.js');
const UserNotification = require('../models/userNotification.model.js');

// Create and Save a new Alert
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }
    const params = req.body;

    // Create a Alert
    const alert = new Alert({
        name: params.name,
        message: params.message,
        incident: params.incidentId,
        createdBy: params.userId, 
        organization: params.organizationId, 
    });

    // Save Alert in the database
    alert.save()
        .then(data => {
            createNotification(data.message, data.organization);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Alert."
            });
        });
};

exports.createCheckin = (req, res) => {
    // Validate request
    if (!req.body.message) {
        return res.status(400).send({
            message: "Alert check in content can not be empty"
        });
    }

    const params = req.body;

    // Create an Alert check in
    const alertCheckin = new AlertCheckin({
        message: params.message,
        status: params.status,
        checkedIn: true,
        alert: req.params.alertId,
        user: params.userId,
        meetingArea: params.meetingAreaId
    });

    // Save Alert in the database
    alertCheckin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the alert check in."
            });
        });
};

exports.getAllCheckinsForIncident = (req, res) => {
    // Validate request
    AlertCheckin.find().where({ alert: req.params.alertId })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving alert check ins."
            });
        });
};

// Retrieve and return all Alerts from the database.
exports.findAll = (req, res) => {
    Alert.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Alerts."
            });
        });
};

// Find a single Alert with a AlertId
exports.findOne = (req, res) => {
    Alert.findById(req.params.alertId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Alert with id " + req.params.alertId
            });
        });
};

// Update an alert identified by the alertId in the request
exports.update = async (req, res) => {
    // Validate Request
    if (!req.params.alertId) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }

    const params = req.body;

    // Find Alert and update it with the request body
    Alert.findByIdAndUpdate(req.params.alertId, {
        name: name,
        timeEnded: params.timeEnded,
        incident: params.incidentId,
        endedBy: params.userId,
        organization: params.organizationId,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            createNotification(data.message, data.organization);
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            return res.status(500).send({
                message: "Error updating Alert with id " + req.params.alertId
            });
        });
};

// Delete a Alert with the specified alertId in the request
exports.delete = (req, res) => {
    Alert.findByIdAndRemove(req.params.alertId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            res.send({ message: "Alert deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.alertId
                });
            }
            return res.status(500).send({
                message: "Could not delete Alert with id " + req.params.alertId
            });
        });
};

exports.findAlertsForOrganization = (req, res) => {
    console.log(req.params)
    Alert.find().where({ organization: req.params.organizationId })
        .then(data => {
            console.log(data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Alerts."
            });
        });
};

/** NOTIFICATIONS */
const createNotification = async (message, organizationId) => {
    console.log('message', message);
    console.log('organizationId', organizationId);

    const notificationSocket = io.of('/notification');
    notificationSocket.emit('notifications', message);
    const notification = new Notification({
        message,
        messageType: 'alert',
        organization: organizationId,
    });

    // Find users in the organization
    const userOrgs = await UserOrganization.find().where({ organization: organizationId });
    console.log('userOrgs', userOrgs);
    // Save notification in the database
    notification.save()
        .then(data => {
            userOrgs.forEach(userOrg => {
                // Create notification for each of the users
                const userNoty = new UserNotification({
                    notification: data._id,
                    user: userOrg.user,
                });
                userNoty.save();
                // Send notification
                // notificationSocket.emit(`notifications/${userOrg.user}`, message);
            });
        }).catch(err => {
            throw err;
        });

    // notificationSocket.emit('notifications', message);
}
