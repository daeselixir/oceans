const mongose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

//excepciones no manejadas codigo sincrono, por ejemplo:

process.on("uncaughtException", (err) => {
  console.log("Ucaught excepction ! 🔥 shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

console.log(process.env.NODE_ENV);
console.log(process.env.JWT_SECRET);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful 🚀 ⚡️ "));
// .catch(err => console.log('Huno un error'))
const port = process.env.PORT || 4000;

//Iniciamos el servidor y estamos escuchando con Listen
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//una promesa no manejada significa que en algun lugar de nuestro codigo una promesa fue rechazada
//podemos solucionar esto con un catch pero puedo agregar una funcion que maneje el global de este tipo de error
//con este on estamos escuchando los evento
//es como nuestra ultima red de serguridad
process.on("unhandledRejection", (err) => {
  //para cerra la aplicacion podemos ocupar process .ext
  console.log("Unhandler rejection ! 🔥 shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x)
