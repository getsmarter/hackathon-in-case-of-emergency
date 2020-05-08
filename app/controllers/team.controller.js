const User = require('../models/User.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        // title: req.body.title || "Untitled User",
        // content: req.body.content
        id: req.body.id || "-1",
        firstName: req.body.firstName || "emtpy",
        lastName: req.body.lastName || "empty",
        cellNo: req.body.cellNo || "0000",
        emailAddress: req.body.emailAddress || "empty",
        team_id: req.body.team_id || "empty"
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(Users => {
            console.log(Users);
            res.send(Users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    User.findById(req.params.UserId)
        .then(User => {
            if (!User) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            res.send(User);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.UserId
            });
        });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.UserId, {
        title: req.body.title || "Untitled User",
        content: req.body.content
    }, { new: true })
        .then(User => {
            if (!User) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            res.send(User);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            return res.status(500).send({
                message: "Error updating User with id " + req.params.UserId
            });
        });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.UserId)
        .then(User => {
            if (!User) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.UserId
            });
        });
};