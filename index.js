const express = require("express");
const router = require("./Router");
const bodyParser = require("body-parser")
const conexion = require("./database/conexion");
const cors = require("cors");
require('dotenv').config({path:"variable.env"})

require("./EntIty/Usuarios");
require("./EntIty/Fuentes");
require("./EntIty/Sedes");
require("./EntIty/Estados");
require("./EntIty/Escuelas");
require("./EntIty/Proyectos");
require("./EntIty/Roles");
require("./EntIty/Fomatos");
require("./EntIty/MaestroDocumento");
require("./EntIty/Documentos");
require("./EntIty/Folios");
require("./EntIty/Lineas");


conexion.sync()
    .then(() =>{ console.log("database a la database")})
    .catch(err =>{console.log(err)})


const app =  express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors())
app.use(express.static('Public/document'))
app.use("/",router());


app.listen(port,() =>{
    console.log("App listo puerto: "+ process.env.PORTLOCAL);
})