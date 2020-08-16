const express = require('express')
const morgan = require('morgan')
//Body parser nos sirve para manejar todo el cuerpo de la request y la respuesta y como se
//van a devolver esos datos
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

//Importar Routes


//app engloba todas las funciones de express

const app = express();

//Middlewares
//Cargamos morgan solo en un entorno Desarrollo

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes middleware

app.get('/', (req, res) => {
    res.send('Tood ok')
})

module.exports = app;