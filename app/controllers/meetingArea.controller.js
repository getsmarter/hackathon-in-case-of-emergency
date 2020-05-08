const MeetingArea = require('../models/meetingArea.model.js');

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Team content is not valid"
        });
    }

    // Create a MeetingArea
    const meetingArea = new MeetingArea({
        name: req.body.name,
        parkingLot: req.body.parkingLot,
        organization: req.body.organizationId,
    });

    // Save MeetingArea in the database
    meetingArea.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the meeting area."
            });
        });
};

// Retrieve and return all meeting areas for an org from the database.
exports.findAll = (req, res) => {
    MeetingArea.find().where({ organization: req.params.organizationId })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving meeting areas for organization."
            });
        });
};

// Find a single meeting area
exports.findOne = (req, res) => {
    MeetingArea.findById(req.params.meetingAreaId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            return res.status(500).send({
                message: "Error retrieving meeting area with id " + req.params.meetingAreaId
            });
        });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Meeting Area content can not be empty"
        });
    }

    MeetingArea.findByIdAndUpdate(req.params.meetingAreaId, {
        name: req.body.name,
        parkingLot: req.body.parkingLot,
        organization: req.body.organizationId,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            return res.status(500).send({
                message: "Error updating meeting area with id " + req.params.meetingAreaId
            });
        });
};


exports.delete = (req, res) => {
    MeetingArea.findByIdAndRemove(req.params.meetingAreaId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            res.send({ message: "Meeting Area deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Meeting Area not found with id " + req.params.meetingAreaId
                });
            }
            return res.status(500).send({
                message: "Could not delete Meeting Area with id " + req.params.meetingAreaId
            });
        });
};