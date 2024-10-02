const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");

//----------CREAR-----------CREAR-----------------CREAR-------------------------------------------
async function crear(data) {
  try {
    if (data.password.length === 0) {
      throw new Error("Contraseña invalida");
    }
    const hashPassword = await bcrypt.hash(data.password.toString(), 5);
    data.password = hashPassword;
    data.activo = 1;

    return db.crearUsuario(TABLA, data);
  } catch (err) {
    throw err;
  }
}

//-------LEER---------LEER----------LEER------------------------------
function leer() {
  return db.leerUsuarios(TABLA);
}

function eliminar(id) {
  return db.eliminarUsuario(TABLA, id);
}

module.exports = { crear, leer, eliminar };
