const servicios = require("./servicios");
const respuesta = require("../../Red/respuestas");

async function crear(req, res, next) {
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

module.exports = { crear };
