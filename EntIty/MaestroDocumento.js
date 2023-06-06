const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Folios = require("./Folios");
const Usuarios =  require("./Usuarios");

const MaestroFolio = conexion.define("MAESTRO_FOLIO",{
    idmaestro:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
})

MaestroFolio.belongsTo(Folios);
MaestroFolio.belongsTo(Usuarios);
module.exports = MaestroFolio;