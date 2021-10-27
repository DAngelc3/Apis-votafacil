const express = require("express");

const app = express();

// middlewares (funciones para procesar datos)
app.use(express.json()); //convierte a objetos de js
app.use(express.urlencoded({ extended: false })); //entiende los datos de los formularios(solo texto)

// Routes
app.use(require("./routes/index")); //importa las rutas

app.listen(4000);
console.log("Server on port", 4000);
