const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Proyectos =  conexion.define("PROYECTOS",{
    idproyecto:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    }
})

module.exports = Proyectos;