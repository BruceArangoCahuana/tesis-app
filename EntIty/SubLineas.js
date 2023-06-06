const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const SubLineas = conexion.define("SUBLINEAS",{
    idsublineas:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }, name:{
        type: Sequelize.STRING
    }
})

module.exports = SubLineas;