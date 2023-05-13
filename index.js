const express = require("express");
const router = require("./Router");
const conexion = require("./database/conexion");


require("./EntIty/Usuarios");
require("./EntIty/Documentos");
require("./EntIty/Fuentes");
require("./EntIty/Sedes");
require("./EntIty/Estados");
require("./EntIty/Escuelas");
require("./EntIty/Proyectos");
require("./EntIty/DetalleFormato");
require("./EntIty/Roles");
require("./EntIty/Fomatos");
require("./EntIty/MaestroDocumento");
conexion.sync()
    .then(() =>{ console.log("Conexion a la database")})
    .catch(err =>{console.log(err)})


const app =  express();
app.use("/",router());

const port = 3500
app.listen(port,() =>{
    console.log("App listo puerto: "+ port);
})