const Organization = require('../models/organization.model.js');

// Create and Save a new Organization
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Organization content can not be empty"
        });
    }

    // Create a Organization
    const org = new Organization({
        name: req.body.title || "Untitled Organization"
    });

    // Save Organization in the database
    org.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Organization."
            });
        });
};

// Retrieve and return all Organizations from the database.
exports.findAll = (req, res) => {
    Organization.find()
        .then(Organizations => {
            console.log(Organizations);
            res.send(Organizations);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Organizations."
            });
        });
};

// Find a single Organization with a OrganizationId
exports.findOne = (req, res) => {
    Organization.findById(req.params.OrganizationId)
        .then(Organization => {
            if (!Organization) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            res.send(Organization);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Organization with id " + req.params.OrganizationId
            });
        });
};

// Update a Organization identified by the OrganizationId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Organization content can not be empty"
        });
    }

    // Find Organization and update it with the request body
    Organization.findByIdAndUpdate(req.params.OrganizationId, {
        name: req.body.name || "Untitled Organization",
    }, { new: true })
        .then(Organization => {
            if (!Organization) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            res.send(Organization);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            return res.status(500).send({
                message: "Error updating Organization with id " + req.params.OrganizationId
            });
        });
};

// Delete a Organization with the specified OrganizationId in the request
exports.delete = (req, res) => {
    Organization.findByIdAndRemove(req.params.OrganizationId)
        .then(Organization => {
            if (!Organization) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            res.send({ message: "Organization deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.OrganizationId
                });
            }
            return res.status(500).send({
                message: "Could not delete Organization with id " + req.params.OrganizationId
            });
        });
};