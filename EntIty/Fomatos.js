const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Documentos = require("./Documentos");
const DetalleFormato = require("./DetalleFormato");
const Usuarios = require("./Usuarios");
const Proyectos = require("./Proyectos");
const Escuelas = require("./Escuelas");
const Sedes = require("./Sedes");
const Fuentes = require("./Fuentes");

const Formatos = conexion.define("FORMATOS",{
    idformato:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cod_registro:{
        type:Sequelize.INTEGER
    },
    fecha_registro:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})

Formatos.belongsTo(Documentos);
Formatos.belongsTo(DetalleFormato);
Formatos.belongsTo(Usuarios);
Formatos.belongsTo(Proyectos);
Formatos.belongsTo(Escuelas);
Formatos.belongsTo(Sedes);
Formatos.belongsTo(Fuentes);
module.exports = Formatos;