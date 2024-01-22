const { response, request } = require("express");
const Chofer = require("../models/choferModel");
const { ObjectId } = require("mongodb");

// 400 Bad Request: solicitud incorrecta
// 401 Unauthorized: requiere autenticación para acceder
// 403 Forbidden: cliente no tiene permisos
// 404 Not Found: recurso solicitado no se encuentra

// 200 OK: solicitud exitosa.
// 201 Created: creación exitosa de recurso

// 500 Internal Server Error

//obtener todos
const choferGet = async (req = request, res = response) => {
  try {
    const allChofer = await Chofer.find();
    res.json(allChofer);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

//obtener por id
const choferGetByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const chofer = await Chofer.findById(id);

    if (!chofer) {//si no se encontró
      return res.status(404).json({//Not Found
        success: false,
        message: "Chofer no encontrado",
      });
    }

    // res.json({
    //   success: true,
    //   chofer,
    // });

    res.json(chofer);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

//crear chofer
const choferPost = async (req, res) => {
  try {
    let { dni, nombre, fechaIngreso } = req.body;

    const choferEncontrado = await Chofer.findOne({ dni });

    if (choferEncontrado) {//si DNI duplicado
      return res.status(404).json({
        success: false,
        message: "El número de DNI ya existe",
      });
    }

    const chofer = new Chofer({ dni, nombre, fechaIngreso });

    await chofer.save();
    res.status(201).json({
      success: true,
      message: "Se registró el chofer correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

//editar chofer
const choferPut = async (req, res = response) => {
  try {
    // Obtener los datos actualizados del chofer de req.body
    // const { id, nombre, dni, fechaIngreso } = req.body;
    const { id } = req.params;
    const { nombre, dni, fechaIngreso } = req.body;

    const choferEncontrado = await Chofer.findOne({ dni });//buscar un documento en la colección

    if (choferEncontrado !== null && choferEncontrado?.id !== id) {
      //se encontró chofer con diferente identificador
      res.status(400).json({
        success: true,
        message: "El dni que ingreso ya existe",
      });
    }

    // Actualizar el chofer en la base de datos
    await Chofer.findByIdAndUpdate(id, { nombre, dni, fechaIngreso });

    res.status(200).json({
      success: true,
      message: "Se modificó el chofer correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al editar el chofer",
    });
  }
};

//elimina chofer
const choferDelete = async (req, res) => {
  try {
    const { id } = req.params;
    //elimina
    await Chofer.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Se eliminó el chofer correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el chofer",
    });
  }
};

module.exports = {
  choferGet,
  choferGetByID,
  choferPost,
  choferPut,
  choferDelete,
};
