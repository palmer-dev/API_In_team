const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        roles: req.body.roles,
        password: bcrypt.hashSync(req.body.password, 8),
        tel: req.body.tel
    });

    user.save((err, user) => {
        if (err) {
            res.status(500)
                .send({
                    message: err
                });
            return;
        } else {
            res.status(200)
                .send({
                    message: "User Registered successfully"
                })
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.username
    }).populate("school")
        .populate("roles")
        .exec((err, user) => {
            if (err) {
                res.status(500)
                    .send({
                        message: err
                    });
                return;
            }
            if (!user) {
                return res.status(404)
                    .send({
                        message: "User Not found."
                    });
            }

            //comparing passwords
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // checking if password was valid and send response accordingly
            if (!passwordIsValid) {
                return res.status(401)
                    .send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
            }
            //signing token with user id
            var token = jwt.sign({
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: 900
            });

            //responding to client request with user profile success message and  access token .
            res.status(200)
                .send({
                    user: {
                        id: user._id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        tel: user.tel,
                        school: user.school,
                        roles: user.roles
                    },
                    message: "Login successfull",
                    accessToken: token,
                });
        });
};