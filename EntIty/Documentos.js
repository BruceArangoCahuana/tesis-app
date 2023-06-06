const {Sequelize} = require("sequelize");
const  conexion = require("../database/conexion")

const Usuarios = require("./Usuarios");
const Estados = require("./Estados");
const Sedes = require("./Sedes");
const Folios = require("./Folios")

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
    codigodoc:{
        type: Sequelize.STRING(10)
    },
    titulo:{
        type: Sequelize.STRING
    }
})


Documentos.belongsTo(Usuarios);
Documentos.belongsTo(Estados);
Documentos.belongsTo(Sedes);

module.exports = Documentos;