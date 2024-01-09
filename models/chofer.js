const { Schema, model } = require('mongoose');

const ChoferSchema = Schema({
  dni: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
    unique: true,
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  fechaIngreso: {
    type: Date,
    required: [true, 'La fecha de ingreso es obligatoria'],
  },
});

module.exports = model('Chofer', ChoferSchema);
