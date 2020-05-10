const Team = require('../models/team.model.js');

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.shortName) {
        return res.status(400).send({
            message: "Team content can not be empty"
        });
    }

    // Create a Team
    const team = new Team({
        shortName: req.body.shortName,
        fullName: req.body.fullName,
        organization: req.body.organizationId,
        meetingArea: req.body.meetingAreaId
    });

    // Save Team in the database
    team.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Team."
            });
        });
};

// Retrieve and return all Teams from the database.
exports.findAll = (req, res) => {
    Team.find().where({ organization: req.params.organizationId })
        .then(Teams => {
            console.log(Teams);
            res.send(Teams);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Teams."
            });
        });
};

// Find a single Team with a TeamId
exports.findOne = (req, res) => {
    Team.findById(req.params.teamId)
        .then(Team => {
            if (!Team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            res.send(Team);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Team with id " + req.params.teamId
            });
        });
};

// Update a Team identified by the TeamId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.TeamId) {
        return res.status(400).send({
            message: "Team content can not be empty"
        });
    }

    // Find Team and update it with the request body
    Team.findByIdAndUpdate(req.params.teamId, {
        shortName: req.body.shortName,
        fullName: req.body.fullName,
        organization: req.body.organizationId,
        meetingArea: req.body.meetingAreaId
    }, { new: true })
        .then(Team => {
            if (!Team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            res.send(Team);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Error updating Team with id " + req.params.teamId
            });
        });
};

// Delete a Team with the specified TeamId in the request
exports.delete = (req, res) => {

    Team.findByIdAndRemove(req.params.teamId)
        .then(Team => {
            if (!Team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            res.send({ message: "Team deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Could not delete Team with id " + req.params.teamId
            });
        });
};
