const mysql = require("mysql2");
const config = require("../src/config");

let connection = null;

function conMysql() {
  connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  connection.connect((err) => {
    if (err) {
      console.log("[DataBase error]", err);
      setTimeout(conMysql, 2000);
    } else {
      console.log("Base de datos conectada!!!");
    }
    connection.on("error", (err) => {
      if (err.code == "PROTOCOL_CONNECTION_LOST") {
        conMysql();
      } else throw err;
    });
  });
}

conMysql();

function crearUsuario(tabla, data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

function leerUsuarios(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, usuario, activo FROM ${tabla}`,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

function eliminarUsuario(tabla, id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${tabla} WHERE id =  ?`,
      id,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${tabla} WHERE ?`,
      consulta,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

function comprarProducto(tabla, data) {
  const { id, sku, cantidad } = data;
  const sql = `CALL sp_ValidCantidad(${cantidad}, '${sku}')`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      return err ? reject((result.affectedRows = 0)) : resolve(result);
    });
  });
}

module.exports = {
  crearUsuario,
  leerUsuarios,
  eliminarUsuario,
  query,
  comprarProducto,
};
