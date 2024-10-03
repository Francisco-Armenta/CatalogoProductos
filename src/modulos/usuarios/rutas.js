const express = require("express");
const ctrl = require("./controlador");
const { verificarToken } = require("../../middleware/aut");

const router = express.Router();

router.post("/", verificarToken, ctrl.crear);
router.get("/", verificarToken, ctrl.leer);
router.put("/", verificarToken, ctrl.eliminar);

module.exports = router;
