const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const Fuentes = conexion.define("FUENTES",{
    idfuentes:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    }
})

module.exports = Fuentes;