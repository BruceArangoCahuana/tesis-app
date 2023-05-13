const {Sequelize} = require("sequelize");
const  conexion = require("../database/conexion")
const Roles = require("./Roles");

const Usuarios = require("./Usuarios");
const Estados = require("./Estados");

const Documentos = conexion.define("DOCUMENTOS",{
    iddocumentos:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    path:{
        type: Sequelize.STRING
    },
    fecha_registro:{
        type:Sequelize.DATE
    },
    nombre:{
        type: Sequelize.STRING
    },
    interesados:{
        type: Sequelize.STRING
    }
})
Documentos.belongsTo(Usuarios);
Documentos.belongsTo(Estados);
module.exports = Documentos;