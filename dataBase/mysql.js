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

module.exports = { crearUsuario, query };
