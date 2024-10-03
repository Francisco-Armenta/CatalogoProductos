const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");
const autenticacion = require("../../middleware/aut");

async function login(usuario, password) {
  const results = await db.query(TABLA, { usuario });

  if (!results.length) {
    throw new Error("El usuario inactivo o inexistente");
  }

  const user = results[0];
  const expiraEn = "10m";

  return bcrypt.compare(password, user.password).then((resultado) => {
    if (resultado == true) {
      //generar un token
      return autenticacion.asignarToken({ ...user }, expiraEn);
    } else {
      throw new Error("Informacion invalida");
    }
  });
}

module.exports = { login };
