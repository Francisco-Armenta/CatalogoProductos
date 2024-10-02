const db = require("../../../dataBase/mysql");
const TABLA = "Productos";
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

//--------ELIMINAR------ELIMINAR------ELIMINAR------------------
function comprar(data) {
  return db.comprarProducto(TABLA, data);
}

module.exports = { crear, leer, comprar };
