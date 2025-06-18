const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/userCntrl");

router.post("/users", createUser);

module.exports = router;
