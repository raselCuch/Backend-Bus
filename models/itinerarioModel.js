const { Schema, model } = require("mongoose");

const DetalleSchema = new Schema({
  idAsiento: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
});

const ItinerarioSchema = new Schema({
  idBus: {
    type: String,
    required: [true, "El ID del bus es obligatorio"],
  },
  fechaViaje: {
    type: Date,
    required: [true, "La fecha de viaje es obligatoria"],
  },
  idChofer: {
    type: String,
    required: [true, "El ID del chofer es obligatorio"],
  },
  detalle: {
    type: [DetalleSchema],
    required: true,
  },
});

module.exports = model("Itinerario", ItinerarioSchema);
