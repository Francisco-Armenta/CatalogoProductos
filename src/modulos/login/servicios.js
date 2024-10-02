const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");
const autenticacion = require("../../middleware/aut");

async function login(usuario, password) {
  console.log(typeof password);
  const results = await db.query(TABLA, { usuario });
  if (!results.length) {
    throw new Error("Usuario y/o contraseña incorrecta.");
  }

  const user = results[0];
  const expiraEn = "1m";
  console.log(user.password);
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
