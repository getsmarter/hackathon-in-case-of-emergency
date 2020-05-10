const User = require('../models/user.model.js');
const Organization = require('../models/organization.model.js');
const UserOrganization = require('../models/userOrganization.model.js');

// Create and Save an Organization
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Organization payload can't be empty"
        });
    }

    const params = req.body;

    // Check if user is valid
    const user = await User.findOne({ _id: req.query.userId });
    if (!user) {
        return res.status(400).send({
            message: "User doesn't exists"
        });
    }

    // Create an Organization
    const org = new Organization({ name: params.name });

    // Save organization in the database
    org.save()
        .then(data => {
            new UserOrganization({ user: user._id, organization: data._id, admin: true }).save().then(userOrgdata => {
                res.send({
                    userAddedToOrg: userOrgdata !== null,
                    ...data._doc
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Organization."
                });
            });
        });
}


exports.findAll = async (req, res) => {
    let organizations = Organization.find();

    if (req.query.userId) {
        const userOrgs = await UserOrganization.find().where({ user: req.query.userId });
        organizations = organizations.where({ _id: { $in: userOrgs.map(userOrg => userOrg.organization )}});
    }

    organizations
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Organizations."
            });
        });
};

// Find a single Organization with a organization Id
exports.findOne = (req, res) => {
    Organization.findById(req.params.organizationId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Organization with id " + req.params.organizationId
            });
        });
};

// Update a Organization identified by the organizationId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Organization content can not be empty"
        });
    }

    // Find Organization and update it with the request body
    Organization.findByIdAndUpdate(req.params.organizationId, {
        name: req.body.name || "Untitled Organization",
    }, { new: true })
        .then(Organization => {
            if (!Organization) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            res.send(Organization);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            return res.status(500).send({
                message: "Error updating Organization with id " + req.params.organizationId
            });
        });
};

// Delete a Organization with the specified organizationId in the request
exports.delete = (req, res) => {
    Organization.findByIdAndRemove(req.params.organizationId)
        .then(Organization => {
            if (!Organization) {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            res.send({ message: "Organization deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Organization not found with id " + req.params.organizationId
                });
            }
            return res.status(500).send({
                message: "Could not delete Organization with id " + req.params.organizationId
            });
        });
};
