const CrewMember = require('../models/CrewMember.model.js');


// Create and Save a new CrewMember
exports.create = (req, res) => {
    // Validate request
    if (!req.body.speciality) {
        return res.status(400).send({
            message: "CrewMember content can not be empty"
        });
    }

    // Create a CrewMember
    const crew = new CrewMember({
        speciality: req.body.speciality || "emtpy",
        user: req.body.userid || null,
        organization: req.body.organizationid || null
        
    });

    // Save CrewMember in the database
    crew.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CrewMember."
            });
        });
};

// Retrieve and return all CrewMembers from the database.
exports.findAll = (req, res) => {
    CrewMember.find()
        .then(CrewMembers => {
            console.log(CrewMembers);
            res.send(CrewMembers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving CrewMembers."
            });
        });
};

// Find a single CrewMember with a CrewMemberId
exports.findOne = (req, res) => {
    CrewMember.findById(req.params.CrewMemberId)
        .then(CrewMember => {
            if (!CrewMember) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            res.send(CrewMember);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            return res.status(500).send({
                message: "Error retrieving CrewMember with id " + req.params.CrewMemberId
            });
        });
};

// Update a CrewMember identified by the CrewMemberId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "CrewMember content can not be empty"
        });
    }

    // Find CrewMember and update it with the request body
    CrewMember.findByIdAndUpdate(req.params.CrewMemberId, {
        speciality: req.body.speciality || "emtpy",
        user: req.body.userid || null,
        organization: req.body.organizationid || null
    }, { new: true })
        .then(CrewMember => {
            if (!CrewMember) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            res.send(CrewMember);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            return res.status(500).send({
                message: "Error updating CrewMember with id " + req.params.CrewMemberId
            });
        });
};

// Delete a CrewMember with the specified CrewMemberId in the request
exports.delete = (req, res) => {
    CrewMember.findByIdAndRemove(req.params.CrewMemberId)
        .then(CrewMember => {
            if (!CrewMember) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            res.send({ message: "CrewMember deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.CrewMemberId
                });
            }
            return res.status(500).send({
                message: "Could not delete CrewMember with id " + req.params.CrewMemberId
            });
        });
};