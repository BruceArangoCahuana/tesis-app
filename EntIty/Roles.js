const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Roles = conexion.define("ROLES",{
    idroles:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING
    }
})

module.exports = Roles;