const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const  Escuelas = conexion.define("ESCUELAS",{
    idescualas:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    }
})

module.exports = Escuelas;