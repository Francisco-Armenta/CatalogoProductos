const express = require("express");
const ctrl = require("./controlador");
const router = express.Router();

router.post("/", ctrl.crear);

module.exports = router;
