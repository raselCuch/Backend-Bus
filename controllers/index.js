const auth = require('./auth');
// const categorias = require('./categorias');
const usuarios= require('./usuarios');
const bus= require('./bus');
// const productos= require('./productos');
module.exports={
    ...auth,
    // ...categorias,
    ...usuarios,
    ...bus,
    // ...productos
}