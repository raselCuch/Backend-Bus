const { response, request } = require("express");
// express: framework web para Node.js que simplifica el desarrollo de aplicaciones
const Bus = require("../models/busModel");
const { ObjectId } = require("mongodb"); // Importa ObjectId de mongodb

// obtener todos los buses
const busGet = async (req = request, res = response) => {
  const buses = await Bus.find();
  res.json(buses); //responde un array de autobuses en JSON
};

// obtener un bus por ID
const busGetId = async (req = request, res = response) => {
  //En Express, los parámetros de la URL se encuentran en req.params
  try {
    // const { _id } = req.params; // Cambia req.body por req.params para obtener el _id desde los parámetros de la URL
    const { id } = req.params; // desestructuración de objetos para extraer el valor "_id"
    const bus = await Bus.findById(id); // buscar bus por  "_id"

    if (!bus) {
      //si no se encuentra
      return res.status(404).json({
        //404 "Not Found"
        //tiene return porque termino anormalamente
        success: false, // indica si operación fue exitosa o no
        message: "Bus no encontrado",
      });
    }

    // Si se encuentra
    res.json({
      //no tiene return porque después de enviar respuesta, la función completará con normalidad
      success: true,
      bus, //responde la información del bus
    });
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

// crear bus
const busPost = async (req, res) => {
  try {
    //las variables cambiaran su valor
    let { placa, marca, modelo, asientos } = req.body; // utiliza info del cuerpo de la solicitud req.body

    //la variable no cambiará su valor
    const placaEncontrada = await Bus.find({ placa });

    if (placaEncontrada.length > 0)
      //si hay más de una
      return res.status(404).json({
        //
        success: false,
        message: "El numero de placa ya existe",
      });

    let cantidad = asientos;
    asientos = [];

    for (i = 1; i <= cantidad; i++) {
      // llena de asientos el array "asientos"
      asientos.push({
        //generar y agregar objetos
        idAsiento: new ObjectId(), //crea un nuevo identificador único de asiento
        correlativo: i,
      });
    }

    const bus = new Bus({ placa, marca, modelo, asientos });

    await bus.save(); //método de Mongoose
    //operacion asíncronas

    res.status(201).json({
      //201 Created
      success: true,
      message: "Se registro correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

// edita bus
const busPut = async (req, res = response) => {
  try {
    // req.params -> acceder a parámetros de la URL
    const { id } = req.params; // Obtener el _id del autobús desde los parámetros de la URL

    //req.body -> acceder a datos del cuerpo de la solicitud HTTP,
    const { placa, marca, modelo, asientos } = req.body; // Obtener los datos actualizados del autobús de req.body

    // Verificar si el autobús existe
    const busVerificado = await Bus.findById(id);

    if (!busVerificado) {
      //no existe
      return res.status(404).json({
        //404 Not Found
        success: false,
        message: "Autobús no encontrado",
      });
    }

    // edita datos
    busVerificado.placa = placa;
    busVerificado.marca = marca;
    busVerificado.modelo = modelo;
    busVerificado.asientos = []; // array a cero

    for (let i = 1; i <= asientos; i++) {
      //volvemos a generar los asientos
      busVerificado.asientos.push({
        idAsiento: new ObjectId(), //ObjectId proviene de Mongoose
        correlativo: i,
      });
    }

    await busVerificado.save(); //guarda cambios

    res.status(200).json({
      //200 OK
      success: true,
      message: "Se modificó el autobús correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

// eliminar bus por id
const busDelete = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el _id del autobús desde los parámetros de la URL

    // Verificar si el autobús existe
    const busExistente = await Bus.findById(id);
    if (!busExistente) {
      return res.status(404).json({
        success: false,
        message: "Autobús no encontrado",
      });
    }

    // busca y elimina el bus
    await Bus.findByIdAndDelete(id);

    res.json({
      //devuelve respuesta
      success: true,
      message: "Se eliminó el autobús correctamente",
    });
  } catch (error) {
    console.log(error); //imprime en consola el error
    res.status(500).json({
      //500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

const busDeleteAsientos = async (req, res) => {
  try {
    const { id } = req.params;
    const { idAsientos } = req.body;

    // verificar si bus existe
    const busExistente = await Bus.findById(id);
    if (!busExistente) {
      return res.status(404).json({
        success: false,
        message: "Autobús no encontrado",
      });
    }

    // Filtrar los asientos a eliminar
    const asientosFiltrados = busExistente.asientos.filter(// función de filtro
      (asiento) => !idAsientos.includes(asiento.idAsiento.toString())
    );

    // Actualizar el autobús con los asientos restantes
    busExistente.asientos = asientosFiltrados;

    await busExistente.save();

    res.json({
      success: true,
      message: "Se eliminaron los asientos correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //  500 Internal Server Error
      success: false,
      message: "Error en el servidor",
    });
  }
};

module.exports = {
  busGet,
  busGetId,
  busPost,
  busPut,
  busDelete,
  busDeleteAsientos,
};
