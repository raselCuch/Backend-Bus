const {
  Schema, //definir la estructura de documentos en MongoDB
  model, //crea modelos basados en los esquemas
} = require("mongoose"); //import's

const AsientoSchema = new Schema({
  //Definir esquema del modelo Asiento
  correlativo: {
    //nombre de propiedad
    type: String, //tipo de variable
    required: true, //el dato es OBLIGATORIO
  },
});

const BusSchema = new Schema({
  placa: {
    type: String,
    required: [true, "La placa es obligatoria"], //mensajes de error personalizados, en caso se deja vacío
  },
  marca: {
    type: String,
    required: [true, "La marca es obligatoria"],
  },
  modelo: {
    type: String,
    required: [true, "El modelo es obligatorio"],
  },
  asientos: {
    type: [AsientoSchema], //array de asientos
    required: true,
  },
});

//esprit //entender mejor esto, es una "promesa"
BusSchema.methods.toJSON = function () {
  //modifica la salida JSON del objeto "Bus"
  //elimina la propiedad __v
  const { __v, _id, ...bus } = this.toObject();
  bus.uid = _id; //renombra propiedad _id a uid
  return bus; //devuelve objeto modificado
};

module.exports = model("Bus", BusSchema); //Exporta el modelo creado como "Bus"
