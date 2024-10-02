const express = require("express");
const config = require("./config");

const app = express();

app.use(express.json());

//Configuraciones
app.set("port", config.app.port);

//Rutas
const usuarios = require("./modulos/usuarios/rutas");
app.use("/usuarios", usuarios);

const login = require("./modulos/login/rutas");
app.use("/login", login);

const productos = require("./modulos/productos/rutas");
app.use("/productos", productos);

module.exports = app;
