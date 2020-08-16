const mongose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({
    path: './.env'
})

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB connection successful 🚀 ⚡️ "))

const port = process.env.PORT || 3000

//Iniciamos el servidor y estamos escuchando con Listen
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})