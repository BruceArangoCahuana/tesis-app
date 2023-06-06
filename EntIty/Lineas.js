const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const Lineas = conexion.define("LINEAS",{
    idlineas:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }, name:{
        type: Sequelize.STRING
    }
})

module.exports = Lineas;