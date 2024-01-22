//simplificación de rutas
//import's de controladores
const auth = require("./auth");
const usuarios = require("./usuariosController");
const bus = require("./busController");
const chofer = require("./choferController");
const itinerario = require("./itinerarioController");

//Combina todos los controladores
module.exports = {
  //propiedades de cada objeto se agregarán al exportado
  ...auth, 
  ...usuarios,
  ...bus,
  ...chofer,
  ...itinerario, //operador de propagación
};
