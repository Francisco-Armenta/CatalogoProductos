const servicios = require("./servicios");

async function login(req, res, next) {
  const { usuario, password } = req.body;
  try {
    const token = await servicios.login(usuario, password);
    respuesta.success(req, res, token, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
