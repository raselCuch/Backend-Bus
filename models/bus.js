const { Schema, model } = require('mongoose');

const AsientoSchema = new Schema({
  idAsiento: {
    type: String,
    required: true,
  },
  correlativo: {
    type: String,
    required: true,
  },
});

const BusSchema = new Schema({
  id: {
    type: String,
    required: [true, 'El ID es obligatorio'],
    unique: true,
  },
  placa: {
    type: String,
    required: [true, 'La placa es obligatoria'],
    unique: true,
  },
  marca: {
    type: String,
    required: [true, 'La marca es obligatoria'],
  },
  modelo: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
  },
  asientos: {
    type: [AsientoSchema],
    required: true,
  },
});

module.exports = model('Bus', BusSchema);
