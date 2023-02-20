const express = require("express"),
    router = express.Router(),
    {
        signin,
        logout,
    } = require("../controllers/auth.controller.js");

router.post("/login", signin);

module.exports = router;