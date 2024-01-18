const express = require("express"); //para crear la aplicación
const cors = require("cors");
const { dbConnection } = require("../database/config");
// const fileUpload = require("express-fileupload");//manejar la carga de archivos

class Server {
  //configurar el servidor.
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      buses: "/api/buses",
      choferes: "/api/chofer",
      itinerario: "/api/itinerario",
    };

    //conexión a la base de datos
    this.conectarDB();
    //configuración de middlewares
    this.middlewares();
    //configuración de rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection(); //establecer conexión a base de datos en "../database/config "
  }

  //configura los middlewares para la aplicación Express
  middlewares() {
    //CORS
    this.app.use(cors()); //manejar la política

    //Lectura y parseo del codigo
    this.app.use(express.json()); //permitir la lectura y el parseo del cuerpo de las solicitudes en formato JSON
  }

  routes() {
    //configura rutas para la aplicación Express
    this.app.use(this.paths.auth, require("../routes/auth"));

    this.app.use(this.paths.usuarios, require("../routes/usuariosRouter"));
    this.app.use(this.paths.buses, require("../routes/busRouter"));
    this.app.use(this.paths.choferes, require("../routes/choferRouter"));
    this.app.use(this.paths.itinerario, require("../routes/itinerarioRouter"));
  }

  listen() {
    //inicia el servidor y escuchar en el puerto "port"
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server; //Exporta la clase Server
