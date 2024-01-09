const { Schema, model } = require('mongoose');

const ItinerarioDetalleSchema = new Schema({
  idItinerario: {
    type: String,
    required: [true, 'El ID del itinerario es obligatorio'],
  },
  idAsiento: {
    type: String,
    required: [true, 'El ID del asiento es obligatorio'],
  },
  dni: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
  },
  nombres: {
    type: String,
    required: [true, 'Los nombres son obligatorios'],
  },
});

module.exports = model('ItinerarioDetalle', ItinerarioDetalleSchema);
