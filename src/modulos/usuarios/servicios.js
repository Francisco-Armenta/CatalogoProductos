const db = require("../../../dataBase/mysql");
const TABLA = "usuarios";
const bcrypt = require("bcrypt");

<<<<<<< HEAD
//----------CREAR-----------CREAR-----------------CREAR-------------------------------------------
=======
// function crear(body) {

//   return db.crearUsuario(TABLA, body);
// }

>>>>>>> d1983fec5ab553d1d92350b8554a7ff134d062a4
async function crear(data) {
  try {
    if (data.password.length === 0) {
      throw new Error("Contraseña invalida");
    }
    const hashPassword = await bcrypt.hash(data.password.toString(), 5);
    data.password = hashPassword;
<<<<<<< HEAD
    data.activo = 1;
=======
>>>>>>> d1983fec5ab553d1d92350b8554a7ff134d062a4

    return db.crearUsuario(TABLA, data);
  } catch (err) {
    throw err;
  }
}

<<<<<<< HEAD
//-------LEER---------LEER----------LEER------------------------------
function leer() {
  return db.leerUsuarios(TABLA);
}

function eliminar(id) {
  return db.eliminarUsuario(TABLA, id);
}

module.exports = { crear, leer, eliminar };
=======
module.exports = { crear };
>>>>>>> d1983fec5ab553d1d92350b8554a7ff134d062a4
