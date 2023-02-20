const jwt = require("jsonwebtoken");

const addTokenToResData = (req, res, status, data) => {
    //signing token with user id
    const token = jwt.sign({
        id: req.user?.id
    }, process.env.API_SECRET, {
        expiresIn: 900
    });

    // ADDING THE NEW TOKEN IN THE DATA
    data.newToken = token;

    res.status(status).json(data);
};

module.exports = addTokenToResData