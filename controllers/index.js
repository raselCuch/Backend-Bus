//simplifica las rutas
const auth = require('./auth');
const usuarios= require('./usuarios');
const bus= require('./bus');
const chofer = require('./chofer')
module.exports={
    ...auth,
    ...usuarios,
    ...bus,
    ...chofer

}