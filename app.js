// configurar y ejecutar un servidor
require("dotenv").config(); //carga variables de archivo ".env"

const Server = require("./models/server");
const server = new Server(); //crea instancia de clase Server

server.listen(); //iniciar servidor y escuchar solicitudes HTTP
