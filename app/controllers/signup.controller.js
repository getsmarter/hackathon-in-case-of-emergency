const User = require('../models/user.model.js');

/** Sign up user | Create and Save a new User */
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "User payload can not be empty"
        });
    }

    const params = req.body;

    // // Check if user already exists with email
    // const user = await User.findOne({ email: params.email });
    // if (user) {
    //     return res.status(400).send({
    //         message: "User already exists"
    //     });
    // }

    // Create the User
    const newUser = new User({
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNo: params.phoneNo,
        email: params.email,
    });

    // Save User in the database
    newUser.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while signing up the user."
            });
        });
};
