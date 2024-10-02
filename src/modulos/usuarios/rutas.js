const express = require("express");
const ctrl = require("./controlador");
const router = express.Router();

router.post("/", ctrl.crear);
<<<<<<< HEAD
router.get("/", ctrl.leer);
router.put("/", ctrl.eliminar);
=======
>>>>>>> d1983fec5ab553d1d92350b8554a7ff134d062a4

module.exports = router;
