const servicios = require("./servicios");
const respuesta = require("../../Red/respuestas");

//--------CREAR-------CREAR------CREAR-------------------

async function crear(req, res, next) {
  try {
    const item = await servicios.crear(req.body);
    if (!req.body.id) {
      mensaje = "Usuario creado";
    } else {
      mensaje = "Usuario actualizado";
    }

    respuesta.success(req, res, mensaje, 200);
  } catch (err) {
    next(err);
  }
}

//--------LEER--------LEER--------LEER----------------------

async function leer(req, res, next) {
  const activo = req.token.activo;
  if (activo === 1) {
    return res.status(200).json("hola");
  }
  try {
    const item = await servicios.leer();

    respuesta.success(req, res, item, 200);
  } catch (err) {
    next(err);
  }
}

//--------COMPRAR----------COMPRAR-----------COMPRAR--------------------------
async function comprar(req, res, next) {
  try {
    const item = await servicios.comprar(req.body);

    console.log(item[0][0].resultado);

    if (req.body.sku && req.body.cantidad && item[0][0].resultado == 1) {
      const mensaje = "Gracias por su compra";
      respuesta.success(req, res, mensaje, 200);
    } else {
      res.status(500).json(item[0][0].mensaje);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { crear, leer, comprar };
