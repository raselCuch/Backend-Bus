const { response, request } = require("express");
const Itinerario = require("../models/itinerarioModel");
// const { ObjectId } = require("mongodb");

const crearItinerario = async (req = request, res = response) => {
  try {
    const { idBus, fechaViaje } = req.body;//obtiene los datos
    const itinerario = new Itinerario({
      idBus,
      fechaViaje,
    });//crea el model

    await itinerario.save();// creado el model

    res.status(201).json({//201 Created
      success: true,
      message: "Se creó el itinerario correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({//500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

const asignarChofer = async (req, res) => {
  try {
    const { idItinerario, idChofer } = req.body;// obtenemos los datos

    await Itinerario.findByIdAndUpdate(idItinerario, { idChofer });// edita

    res.status(200).json({// 200 OK
      success: true,
      message: "Se asignó el chofer correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({//500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

const buscarItinerario = async (req, res) => {
  try {
    const { fecha } = req.body;
    const itinerarios = await Itinerario.find({ fechaViaje: fecha });

    res.json(itinerarios);// responde la lista encontrada
  } catch (error) {
    console.log(error);
    res.status(500).json({// 500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

const registrarPasajero = async (req, res) => {
  try {
    const { idItinerario, idAsiento, dni, nombres } = req.body;

    await Itinerario.findByIdAndUpdate(idItinerario, {
      // "$push": operador para agregar un valor a un array existente
      $push: { detalle: { idAsiento, dni, nombres } },
    });

    res.status(201).json({// 201 Created
      success: true,
      message: "Se registró el pasajero correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({//500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

const editarPasajero = async (req, res) => {
  try {
    // const { idItinerario, idAsiento, dni, nombres } = req.body; 
    const { idAsiento, dni, nombres } = req.body; 

    await Itinerario.updateOne(//busca por "idAsiento"
      { "detalle.idAsiento": idAsiento },
      { $set: { // "$set": actualizar valores de "dni" y "nombres" en el elemento del array "detalle"
        "detalle.$.dni": dni, //"$": refiere al índice del elemento que coincide
        "detalle.$.nombres": nombres 
      } }
    );

    res.status(200).json({//200 OK
      success: true,
      message: "Se editó el pasajero correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({// 500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

//busca pasajeros de una intenerario
const buscarPasajero = async (req, res) => {
  try {
    const { idItinerario } = req.body;
    const itinerario = await Itinerario.findById(idItinerario);

    res.json(itinerario.detalle);
  } catch (error) {// 500 Internal Server Error
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

//elimina todos los pasajeros de un itinerario 
const eliminarPasajero = async (req, res) => {// función asíncrona que toma dos parámetros
  try {
    const { idItinerario } = req.body;

    await Itinerario.findByIdAndUpdate(idItinerario, { detalle: [] });// actualiza "detalle" con un arreglo vacío

    res.json({
      success: true,
      message: "Se eliminaron los pasajeros correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({//500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

module.exports = {
  crearItinerario,
  asignarChofer,
  buscarItinerario,
  registrarPasajero,
  editarPasajero,
  buscarPasajero,
  eliminarPasajero,
};
