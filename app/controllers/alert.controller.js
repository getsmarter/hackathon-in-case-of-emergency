const Alert = require('../models/alert.model.js');
const AlertCheckin = require('../models/alertCheckin.model.js');

// Create and Save a new Alert
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }

    // Create a Alert
    const alert = new Alert({
        name: req.body.name,
        message: req.body.message || "empty",
        timeEnded: req.body.timeEnded || "0000",
        incident: req.body.incidentid || null,
        createdBy: req.body.userid || null, 
        endedBy: req.body.userid || null, 
        organization: req.body.organizationid || null, 
    });

    // Save Alert in the database
    alert.save()
        .then(data => {
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
            message: "Alert content can not be empty"
        });
    }

    // Create a Alert
    const alertCheckin = new AlertCheckin({
        message: req.body.message,
        status: req.body.status,
        checkedIn: req.body.checkedIn || false,
        alert:  req.body.alert || null,
        user: req.body.user || null,
        meetingArea: req.body.meetingId || null
    });

    // Save Alert in the database
    alertCheckin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Alert."
            });
        });
};

exports.getAllCheckinsForIncident = (req, res) => {
    // Validate request
    AlertCheckin.find({alert:req.body.alertId})
        .then(Alerts => {
            console.log(Alerts);
            res.send(Alerts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Alerts."
            });
        });
};

// Retrieve and return all Alerts from the database.
exports.findAll = (req, res) => {
    Alert.find()
        .then(Alerts => {
            console.log(Alerts);
            res.send(Alerts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Alerts."
            });
        });
};

// Find a single Alert with a AlertId
exports.findOne = (req, res) => {
    Alert.findById(req.params.AlertId)
        .then(Alert => {
            if (!Alert) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            res.send(Alert);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Alert with id " + req.params.AlertId
            });
        });
};

// Update a Alert identified by the AlertId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.AlertId) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }

    // Find Alert and update it with the request body
    Alert.findByIdAndUpdate(req.params.AlertId, {
        name: req.body.name || "empty",
        timeEnded: req.body.timeEnded || "0000",
        incident: req.body.incidentid || null,
        createdBy: req.body.userid || null, 
        endedBy: req.body.userid || null, 
        organization: req.body.organizationid || null, 
    }, { new: true })
        .then(Alert => {
            if (!Alert) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            res.send(Alert);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            return res.status(500).send({
                message: "Error updating Alert with id " + req.params.AlertId
            });
        });
};

// Delete a Alert with the specified AlertId in the request
exports.delete = (req, res) => {
    Alert.findByIdAndRemove(req.params.AlertId)
        .then(Alert => {
            if (!Alert) {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            res.send({ message: "Alert deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Alert not found with id " + req.params.AlertId
                });
            }
            return res.status(500).send({
                message: "Could not delete Alert with id " + req.params.AlertId
            });
        });
};