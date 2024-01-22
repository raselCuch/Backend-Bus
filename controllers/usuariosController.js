const { response, request } = require("express");
const bcryptjs = require("bcryptjs"); // biblioteca en JavaScript para cifrado de contraseñas
const Usuario = require("../models/usuarioModel");

// all ususarios
const usuariosGet = async (req = request, res = response) => {
  const AllUsuarios = await Usuario.find();
  res.json(AllUsuarios);
};

// obtener un bus por ID
const usuarioGetId = async (req = request, res = response) => {
  try {
    const { id } = req.params; // desestructuración de objetos para extraer el valor "_id"
    const usuario = await Usuario.findById(id); // buscar bus por  "_id"

    if (!usuario) {
      return res.status(404).json({
        success: false, // indica si operación fue exitosa o no
        message: "Bus no encontrado",
      });
    }
    res.json(usuario);
  } catch (error) {
    // Manejo de errores: Log del error y respuesta con código 500
    console.error(error);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

//crea usuario
const usuariosPost = async (req, res) => {
  const { nombre, correo, username, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, username, password, rol });

  //Encriptar la contrasenya
  const salt = bcryptjs.genSaltSync(); //genera una sal aleatoria
  usuario.password = bcryptjs.hashSync(password, salt); //producir un hash seguro

  await usuario.save(); //guardar

  res.status(201).json({
    //201 Created
    success: true,
    message: "Se registro correctamente",
  });
};

//edita usuario
// const usuariosPut = async (req, res = response) => {
//   try {
//     // const { id, password, ...resto } = req.body;// Desestructuración d req
//     const { id } = req.params;
//     const { password, username, ...resto } = req.body; // Desestructuración del req

//     if (password) {
//       // si hay nueva contraseña
//       const salt = bcryptjs.genSaltSync();
//       resto.password = bcryptjs.hashSync(password, salt); //hash: algoritmo que produce una "cadena de caracteres alfanuméricos de longitud fija" de una entrada
//     }

//     // if (username) {
//       const usuarioEncontrado = await Usuario.findOne({ resto.username }); //buscar un documento en la colección

//       if (usuarioEncontrado !== null && usuarioEncontrado?.id !== id) {
//         //se encontró chofer con diferente identificador
//         res.status(400).json({
//           success: true,
//           message: "El username que ingresó ya existe",
//         });
//       }
//       if (username) {
//         resto.username = username;
//       }
//     // }
//     await Usuario.findByIdAndUpdate(id, resto);

//     res.status(200).json({
//       success: true,
//       message: "Se modifico correctamente",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error interno del servidor",
//     });
//   }
// };

//edita usuario
const usuariosPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, correo, username, password, rol } = req.body; // Desestructuración del req

    // if (password) {
    //   // si hay nueva contraseña
    //   const salt = bcryptjs.genSaltSync();
    //   resto.password = bcryptjs.hashSync(password, salt); //hash: algoritmo que produce una "cadena de caracteres alfanuméricos de longitud fija" de una entrada
    // }

    const choferVerificado = await Usuario.findById(id);
    if (!choferVerificado) {
      //no existe
      return res.status(404).json({
        //404 Not Found
        success: false,
        message: "Usuario no encontrado",
      });
    }

    choferVerificado.nombre = nombre;
    choferVerificado.correo = correo;
    choferVerificado.username = username;
    choferVerificado.password = password;
    choferVerificado.rol = rol;

    await choferVerificado.save(); //guarda cambios

    res.status(200).json({
      success: true,
      message: "Se modifico correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
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
  usuarioGetId,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
