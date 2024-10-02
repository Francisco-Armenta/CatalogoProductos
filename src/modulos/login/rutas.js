const express = require("express");
const ctrl = require("./controlador");

const router = express.Router();

router.get("/", ctrl.login);

module.exports = router;
