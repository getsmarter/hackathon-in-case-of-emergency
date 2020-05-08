const User = require('../models/user.model.js');
const UserOrganization = require('../models/userOrganization.model.js');


// Retrieve and return users for an organization
exports.findAll = async (req, res) => {
    usersInOrg = await UserOrganization.find({ organization: req.params.organizationId });

    User.find().where('_id').in(usersInOrg.map(user_g => user_g.user))
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Organizations."
            });
        });
};

// Make user admin of org
exports.makeAdmin = (req, res) => {
    // Validate request
    if (!req.body.organizationId) {
        return res.status(400).send({
            message: "Payload is not valid "
        });
    }

    UserOrganization.findOneAndUpdate({ organization: req.body.organizationId, user: req.body.userId }, {
        admin: true
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Organization or User not found with id " + req.body
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organization or User not found with id " + req.body
                });
            }
            return res.status(500).send({
                message: "Error updating Organization or User" + req.body
            });
        });
};