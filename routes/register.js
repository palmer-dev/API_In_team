const express = require("express"),
    router = express.Router(),
    {
        signup
    } = require("../controllers/auth.controller.js");

router.post("/", signup);

module.exports = router;