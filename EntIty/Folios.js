const {Sequelize} = require("sequelize");
const  conexion = require("../database/conexion")
const Usuarios = require("./Usuarios");
const Sedes = require("./Sedes");
const Documentos = require("./Documentos");
const Escuelas = require("./Escuelas");

const Folios = conexion.define("FOLIOS",{
    idfolio:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fecha_registro:{
        type:Sequelize.DATE
    },
    codigofolio:{
        type:Sequelize.STRING(10)
    },
    name:{
        type: Sequelize.STRING
    },
    interesados:{
        type: Sequelize.STRING
    }
})

Folios.belongsTo(Usuarios);
Folios.belongsTo(Sedes);
Folios.belongsTo(Escuelas);
Folios.hasMany(Documentos);
Documentos.belongsTo(Folios);

module.exports = Folios;