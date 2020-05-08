const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "User content is not valid"
        });
    }

    const params = req.body.params;

    const user = new User({
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNo: params.phoneNo,
        email: params.email,
        team: req.body.teamId
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};


exports.findAll = (req, res) => {
    let userQuery = User.find()

    if (req.query.email) {
        userQuery = userQuery.where({ email: req.query.email })
    }

    userQuery
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};


exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.userId
            });
        });
};


exports.update = (req, res) => {
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "User content is not valid"
        });
    }

    const params = req.body.params;

    User.findByIdAndUpdate(req.params.userId, {
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNo: params.phoneNo,
        email: params.email,
        team: params.teamId
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating User with id " + req.params.userId
            });
        });
};


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.userId
            });
        });
};
