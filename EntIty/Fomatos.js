const  {Sequelize} = require('sequelize');
const conexion = require("../database/conexion");

const Documentos = require("./Documentos");

const Usuarios = require("./Usuarios");
const Proyectos = require("./Proyectos");
const Escuelas = require("./Escuelas");
const Sedes = require("./Sedes");
const Fuentes = require("./Fuentes");
const Lineas = require("./Lineas");
const SubLineas = require("./SubLineas");

const Formatos = conexion.define("FORMATOS",{
    idformato:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cod_registro:{
        type:Sequelize.TEXT
    },
    fecha_registro:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    nombre_pro:{
        type:Sequelize.STRING
    },
    nombre_grupo:{
        type:Sequelize.STRING
    },
    nombre_semillero:{
        type:Sequelize.STRING
    },
    invest_prin:{
        type:Sequelize.STRING
    },
    institucion:{
        type:Sequelize.STRING
    },
    co_investigador:{
        type:Sequelize.STRING
    },
    co_investigador_dos:{
        type:Sequelize.STRING
    },
    co_investigador_tres:{
        type:Sequelize.STRING
    },
    co_investigador_cuatro:{
        type:Sequelize.STRING
    },
    co_investigador_cinco:{
        type:Sequelize.STRING
    },
    co_investigador_seis:{
        type:Sequelize.STRING
    },
    estudiante_par:{
        type:Sequelize.STRING
    },
    estudiante_par_dos:{
        type:Sequelize.STRING
    },
    estudiante_par_tres:{
        type:Sequelize.STRING
    },
    estudiante_par_cuatro:{
        type:Sequelize.STRING
    },
    estudiante_par_cinco:{
        type:Sequelize.STRING
    },
    estudiante_par_seis:{
        type:Sequelize.STRING
    },
    tesista:{
        type:Sequelize.STRING
    },
    tesista_dos:{
        type:Sequelize.STRING
    },
    tesista_tres:{
        type:Sequelize.STRING
    },
    tesista_cuatro:{
        type:Sequelize.STRING
    },
    tesista_cinco:{
        type:Sequelize.STRING
    },
    tesista_seis:{
        type:Sequelize.STRING
    },
    resumen_proyecto:{
        type:Sequelize.STRING
    },
    obj_general:{
        type:Sequelize.TEXT
    },
    obj_uno:{
        type:Sequelize.TEXT
    },
    obj_dos:{
        type:Sequelize.TEXT
    },
    obj_tres:{
        type:Sequelize.TEXT
    },
    fecha_inicio:{
        type:Sequelize.DATE
    },
    fecha_termino:{
        type:Sequelize.DATE
    },
    presupuesto_uno:{
        type:Sequelize.FLOAT
    },
    presupuesto_dos:{
        type:Sequelize.FLOAT
    },
    fecha_inscripcion:{
        type:Sequelize.DATE
    }
})

Formatos.belongsTo(Documentos);
Formatos.belongsTo(Usuarios);
Formatos.belongsTo(Proyectos);
Formatos.belongsTo(Escuelas);
Formatos.belongsTo(Sedes);
Formatos.belongsTo(Fuentes);
Formatos.belongsTo(Lineas);
Formatos.belongsTo(SubLineas);
module.exports = Formatos;