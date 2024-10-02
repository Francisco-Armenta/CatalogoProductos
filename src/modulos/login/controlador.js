const servicios = require("./servicios");
const respuesta = require("../../Red/respuestas");

async function login(req, res, next) {
  const { usuario, password } = req.body;
  try {
    const token = await servicios.login(usuario, password);
    res.header("Authorization", token);
    respuesta.success(req, res, token, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
