const mongoose = require("mongoose");//ayuda a trabajar con MongoDB de manera sencilla en Node.js

const dbConnection = async () => {//establecer la conexión a la base de datos
  //es "async" porque la conexión generalmente implica operaciones asíncronas.
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {//cadena de conexión, de la variable de entorno "MONGODB_CNN"
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada correctamente");//Si conexión es exitosa, imprime en consola ""
    
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");//Si ocurre algún error
  }
};

module.exports = {//Exporta la función "dbConnection"
  dbConnection,
};
