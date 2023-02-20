const jwt = require("jsonwebtoken");
const User = require("../models/User");

const hasAccessTo = (userRoles, elementToTest = 'smallestAccessRole') => {
    let hasAccess = false;
    userRoles.forEach(key => {
        if (key.access[elementToTest]) {
            hasAccess = true;
        }
    });
    return hasAccess;
};

const checkRoleAdmin = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
            if (err) req.user = undefined;
            User.findOne({
                _id: decode.id
            }).populate("roles")
                .exec((err, user) => {
                    if (err) {
                        res.status(500)
                            .send({
                                message: err
                            });
                    } else {
                        req.user = user;
                        if (hasAccessTo(user.roles, "roleToCheck")) {
                            next();
                        }
                        else {
                            res.status(403)
                                .send({
                                    message: "Forbidden"
                                });
                        }
                    }
                })
        });
    } else {
        req.user = undefined;
        res.status(403)
            .send({
                message: "Forbidden"
            });
    }
};
module.exports = checkRoleAdmin;