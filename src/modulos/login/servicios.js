const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");
const auth = require("../../autenticacion/aut");

async function login(usuario, password) {
  const results = await db.query(TABLA, { usuario });
  if (!results.length) {
    throw new Error("Usuario y/o contraseña incorrecta.");
  }

  const user = results[0];

  return bcrypt.compare(password, user.password).then((resultado) => {
    if (resultado == true) {
      //generar un token
      return auth.asignarToken({ ...user });
    } else {
      throw new Error("Informacion invalida");
    }
  });
}

module.exports = { login };
