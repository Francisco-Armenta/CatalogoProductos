const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwt.secret;

function asignarToken(data, expireIn = "10m") {
  return jwt.sign(data, secret, { expiresIn: expireIn });
}

function verificarToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(404).json("No se proporciono un token");
  }
  try {
    const secret = config.jwt.secret;
    const verToken = jwt.verify(token, secret);
    req.token = verToken;
    next();
  } catch (error) {
    res.status(500).json("Ocurrio un error al validar el token");
  }
}

module.exports = { asignarToken, verificarToken };
