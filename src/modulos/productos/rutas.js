const express = require("express");
const ctrl = require("./controlador");
const { verificarToken } = require("../../middleware/aut");

const router = express.Router();

// router.post("/", ctrl.crear);
// router.get("/", verificarToken, ctrl.leer);
router.put("/", ctrl.comprar);

module.exports = router;
