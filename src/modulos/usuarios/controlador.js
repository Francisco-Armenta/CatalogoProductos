const servicios = require("./servicios");
const respuesta = require("../../Red/respuestas");

//--------CREAR-------CREAR------CREAR-------------------

async function crear(req, res, next) {
  const rol = req.token.rol;
  if (rol !== "administrador")
    return res.status(404).json("no tienen los permisos");
  try {
    const item = await servicios.crear(req.body);
    if (!req.body.id) {
      mensaje = "Usuario creado";
    } else {
      mensaje = "Usuario actualizado";
    }

    respuesta.success(req, res, mensaje, 200);
  } catch (err) {
    next(err);
  }
}

//--------LEER--------LEER--------LEER----------------------

async function leer(req, res, next) {
  const activo = req.token.activo;
  if (activo != 1) {
    return res
      .status(404)
      .json({ ok: false, msg: "El usuario no esta activo" });
  }
  try {
    const item = await servicios.leer();

    respuesta.success(req, res, item, 200);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    const item = await servicios.eliminar(req.body.id);
    if (req.body.id) {
      const mensaje = "Usuario eliminado con exito";

      respuesta.success(req, res, mensaje, 200);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { crear, leer, eliminar };
