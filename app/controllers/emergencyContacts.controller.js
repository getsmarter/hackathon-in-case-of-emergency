const EmergencyContacts = require('../models/emergencyContact.model.js');


// Create and Save a new EmergencyContacts
exports.create = (req, res) => {
    // Validate request
    if (!req.body.speciality) {
        return res.status(400).send({
            message: "EmergencyContacts content can not be empty"
        });
    }

    // Create a EmergencyContacts
    const emContacts = new EmergencyContacts({
        speciality: req.body.speciality || "emtpy",
        user: req.body.userid || null,
        organization: req.body.organizationid || null
        
    });

    // Save EmergencyContacts in the database
    emContacts.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the EmergencyContacts."
            });
        });
};

// Retrieve and return all EmergencyContactss from the database.
exports.findAll = (req, res) => {
    EmergencyContacts.find()
        .then(EmergencyContactss => {
            res.send(EmergencyContactss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EmergencyContactss."
            });
        });
};

// Find a single EmergencyContacts with a EmergencyContactsId
exports.findOne = (req, res) => {
    EmergencyContacts.findById(req.params.EmergencyContactsId)
        .then(EmergencyContacts => {
            if (!EmergencyContacts) {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            res.send(EmergencyContacts);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            return res.status(500).send({
                message: "Error retrieving EmergencyContacts with id " + req.params.EmergencyContactsId
            });
        });
};

// Update a EmergencyContacts identified by the EmergencyContactsId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "EmergencyContacts content can not be empty"
        });
    }

    // Find EmergencyContacts and update it with the request body
    EmergencyContacts.findByIdAndUpdate(req.params.EmergencyContactsId, {
        speciality: req.body.speciality || "emtpy",
        user: req.body.userid || null,
        organization: req.body.organizationid || null
    }, { new: true })
        .then(EmergencyContacts => {
            if (!EmergencyContacts) {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            res.send(EmergencyContacts);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            return res.status(500).send({
                message: "Error updating EmergencyContacts with id " + req.params.EmergencyContactsId
            });
        });
};

// Delete a EmergencyContacts with the specified EmergencyContactsId in the request
exports.delete = (req, res) => {
    EmergencyContacts.findByIdAndRemove(req.params.EmergencyContactsId)
        .then(EmergencyContacts => {
            if (!EmergencyContacts) {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            res.send({ message: "EmergencyContacts deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "EmergencyContacts not found with id " + req.params.EmergencyContactsId
                });
            }
            return res.status(500).send({
                message: "Could not delete EmergencyContacts with id " + req.params.EmergencyContactsId
            });
        });
};