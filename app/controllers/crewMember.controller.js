const CrewMember = require('../models/crewMember.model.js');


exports.create = (req, res) => {
    if (!req.body.speciality) {
        return res.status(400).send({
            message: "CrewMember content can not be empty"
        });
    }

    const crew = new CrewMember({
        speciality: req.body.speciality,
        user: req.body.userId,
        organization: req.body.organizationId
    });

    crew.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CrewMember."
            });
        });
};


exports.findAll = (req, res) => {
    CrewMember.find().where({ organization: req.params.organizationId })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving CrewMembers."
            });
        });
};


exports.findOne = (req, res) => {
    CrewMember.findById(req.params.crewMemberId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            return res.status(500).send({
                message: "Error retrieving CrewMember with id " + req.params.crewMemberId
            });
        });
};


exports.update = (req, res) => {
    if (!req.body.speciality) {
        return res.status(400).send({
            message: "CrewMember content can not be empty"
        });
    }

    CrewMember.findByIdAndUpdate(req.params.crewMemberId, {
        speciality: req.body.speciality,
        user: req.body.userId,
        organization: req.body.organizationId
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            return res.status(500).send({
                message: "Error updating CrewMember with id " + req.params.crewMemberId
            });
        });
};


exports.delete = (req, res) => {
    CrewMember.findByIdAndRemove(req.params.crewMemberId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            res.send({ message: "CrewMember deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CrewMember not found with id " + req.params.crewMemberId
                });
            }
            return res.status(500).send({
                message: "Could not delete CrewMember with id " + req.params.crewMemberId
            });
        });
};
