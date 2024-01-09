//simplifica las rutas
const auth = require('./auth');
// const categorias = require('./categorias');
const usuarios= require('./usuarios');
// const productos= require('./productos');
module.exports={
    ...auth,
    // ...categorias,
    ...usuarios,
    // ...productos
}