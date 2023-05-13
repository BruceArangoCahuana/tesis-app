const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");
const Usuarios = require("./Usuarios");

const DetalleFormato = conexion.define("DETALLE_FORMATO",{
    iddetallefo:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre_pro:{
        type:Sequelize.STRING
    },
    linea_inv:{
        type:Sequelize.STRING
    },
    sub_linea:{
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
    estudiante_par:{
        type:Sequelize.STRING
    },
    tesista:{
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

DetalleFormato.belongsTo(Usuarios);
module.exports = DetalleFormato;