const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarioModel");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correcto - correo",
      });
    }

    //verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correcto - password",
      });
    }
    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
