const dbValidators = require('./db-validators');

const generarJWT= require('./generar-jwt');

const subirArchivo = require('./subir-archivos');

module.exports={
    ...dbValidators,
    ...generarJWT,
    ...subirArchivo
}