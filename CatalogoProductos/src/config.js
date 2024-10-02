require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT,
  },

  jwt: {
    secret: process.env.JET_SECRET || "NOTA SECRETA",
  },

  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
