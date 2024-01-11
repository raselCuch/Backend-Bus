//simplifica las rutas
const auth = require('./auth');
const usuarios= require('./usuarios');
const bus= require('./bus');
const chofer = require('./chofer');
const itinerario = require('./itinerario');
module.exports={
    ...auth,
    ...usuarios,
    ...bus,
    ...chofer,
    ...itinerario

}