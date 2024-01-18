const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarioModel");

const usuariosGet = async (req = request, res = response) => {
  const usuarios = await Usuario.find();

  res.json(usuarios);
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, username, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, username, password, rol });

  //Encriptar la contrasenya
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en Bd
  await usuario.save();

  res.status(201).json({
    success: true,
    message: "Se registro correctamente",
  });
};

const usuariosPut = async (req, res = response) => {
  const { id, password, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    success: true,
    message: "Se modifico correctamente",
  });
};

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
