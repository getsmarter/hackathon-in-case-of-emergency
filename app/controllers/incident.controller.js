const Incident = require('../models/incident.model.js');


exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Incident content is not valid"
        });
    }

    const incident = new Incident({
        name: req.body.name,
        level: req.body.level,
        organization: req.body.organizationId,
    });

    incident.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the incident"
            });
        });
};


exports.findAll = (req, res) => {
    Incident.find().where({ organization: req.params.organizationId })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving incidents for organization."
            });
        });
};


exports.findOne = (req, res) => {
    Incident.findById(req.params.incidentId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving incident with id " + req.params.incidentId
            });
        });
};


exports.update = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Incident content can not be empty"
        });
    }

    Incident.findByIdAndUpdate(req.params.incidentId, {
        name: req.body.name,
        level: req.body.level,
        organization: req.body.organizationId,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            return res.status(500).send({
                message: "Error updating incident with id " + req.params.incidentId
            });
        });
};


exports.delete = (req, res) => {
    Incident.findByIdAndRemove(req.params.incidentId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            res.send({ message: "Incident deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Incident not found with id " + req.params.incidentId
                });
            }
            return res.status(500).send({
                message: "Could not delete incident with id " + req.params.incidentId
            });
        });
};
