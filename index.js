const express = require("express");
const router = require("./Router");
const conexion = require("./database/conexion");

conexion.sync()
    .then(() =>{ console.log("Conexion a la database")})
    .catch(err =>{console.log(err)})


const app =  express();
app.use("/",router());

const port = 3500
app.listen(port,() =>{
    console.log("App listo puerto: "+ port);
})