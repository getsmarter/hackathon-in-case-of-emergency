const Alert = require('../models/alert.model.js');

// Create and Save a new Alert
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }

    // Create a Alert
    const alert = new Alert({
        firstName: req.body.firstName || "emtpy",
        lastName: req.body.lastName || "empty",
        cellNo: req.body.cellNo || "0000",
        emailAddress: req.body.emailAddress || "empty",
        team_id: req.body.team_id || "empty"
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
    if (!req.body.content) {
        return res.status(400).send({
            message: "Alert content can not be empty"
        });
    }

    // Find Alert and update it with the request body
    Alert.findByIdAndUpdate(req.params.AlertId, {
        firstName: req.body.firstName || "emtpy",
        lastName: req.body.lastName || "empty",
        cellNo: req.body.cellNo || "0000",
        emailAddress: req.body.emailAddress || "empty",
        team_id: req.body.team_id || "empty"
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