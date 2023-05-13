const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const Sedes = conexion.define("SEDES",{
    idsedes:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    }
})

module.exports = Sedes;