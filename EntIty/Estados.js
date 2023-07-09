const {Sequelize} = require("sequelize");
const conexion = require("../database/conexion");

const Estados = conexion.define("ESTADOS",{
    idestados:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    },
    ShowAlumno:{
        type: Sequelize.BOOLEAN
    },
    ShowSecretaria:{
        type: Sequelize.BOOLEAN
    },
    ShowPresidente:{
        type: Sequelize.BOOLEAN
    },
    ShowRevisor:{
        type: Sequelize.BOOLEAN
    },
    ShowInvestigador:{
        type: Sequelize.BOOLEAN
    },
})

module.exports = Estados;