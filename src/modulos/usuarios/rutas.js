const express = require("express");
const ctrl = require("./controlador");
const router = express.Router();

router.post("/", ctrl.crear);
router.get("/", ctrl.leer);
router.put("/", ctrl.eliminar);

module.exports = router;
