const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const Estados = conexion.define("ESTADOS",{
    idestados:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    }
})

module.exports = Estados;