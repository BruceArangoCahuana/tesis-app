const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Documentos = require("./Documentos");
const Usuarios =  require("./Usuarios");

const MaestroDocumento = conexion.define("MAESTRO_DOCUMENTO",{
    idmaestro:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
})

MaestroDocumento.belongsTo(Documentos);
MaestroDocumento.belongsTo(Usuarios);
module.exports = MaestroDocumento;