const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwt.secret;

function asignarToken(data) {
  return jwt.sign(data, secret);
}

async function agregar(data) {
  const authData = {
    id: data.id,
  };

  if (data.usuario) {
    authData.usuario = data.usuario;
  }

  if (data.password) {
    authData.password = await bcrypt.hash(data.password.toString(), 5);
  }

  return db.agregar(TABLA, authData);
}
module.exports = { asignarToken };
