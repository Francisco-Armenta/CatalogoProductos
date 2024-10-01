const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");

// function crear(body) {

//   return db.crearUsuario(TABLA, body);
// }

async function crear(data) {
  try {
    if (data.password.length === 0) {
      throw new Error("Contraseña invalida");
    }
    const hashPassword = await bcrypt.hash(data.password.toString(), 5);
    data.password = hashPassword;

    return db.crearUsuario(TABLA, data);
  } catch (err) {
    throw err;
  }
}

module.exports = { crear };
