const { response, request } = require("express");
const bcryptjs = require("bcryptjs");// biblioteca en JavaScript para cifrado de contraseñas
const Usuario = require("../models/usuarioModel");

// all ususarios
const usuariosGet = async (req = request, res = response) => {
  const AllUsuarios = await Usuario.find();
  res.json(AllUsuarios);
};

//crea usuario
const usuariosPost = async (req, res) => {
  const { nombre, correo, username, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, username, password, rol });

  //Encriptar la contrasenya
  const salt = bcryptjs.genSaltSync();//genera una sal aleatoria
  usuario.password = bcryptjs.hashSync(password, salt);//producir un hash seguro

  await usuario.save();//guardar

  res.status(201).json({//201 Created
    success: true,
    message: "Se registro correctamente",
  });
};

//edita usuario
const usuariosPut = async (req, res = response) => {
  const { id, password, ...resto } = req.body;// Desestructuración del req

  if (password) {// si hay nueva contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);//hash: algoritmo que produce una "cadena de caracteres alfanuméricos de longitud fija" de una entrada
  }

  await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    success: true,
    message: "Se modifico correctamente",
  });
};

//elimina usuario
const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Se elimino correctamente",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
