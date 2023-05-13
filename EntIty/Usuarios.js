const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Roles = require("./Roles");

const Usuarios = conexion.define("USUARIO",{
    idusuario:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    correo:{
        type:Sequelize.STRING,
        unique:true
    },
    password:{
        type:Sequelize.TEXT
    },
    active:{
        type:Sequelize.INTEGER
    }
})

Usuarios.belongsTo(Roles);
module.exports = Usuarios;