const mongose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({
  path: "./.env",
});
console.log(process.env.NODE_ENV);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection successful 🚀 ⚡️ "));

const port = process.env.PORT || 3000;

//Iniciamos el servidor y estamos escuchando con Listen
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//agregamos este process para escuchar y para manejar la proimesa(codigo asincrono) no manejada
//como una ultima red de seguridad
//en este caso estamos probando un error con la BD y si tenemos un error cerramos la aplicacion
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION shutting down ");
  server.close(() => {
    process.exit(1);
  });
});
