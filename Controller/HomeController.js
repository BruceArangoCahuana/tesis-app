const Escuelas = require("../EntIty/Escuelas");
const Sedes = require("../EntIty/Sedes");
const Proyectos = require("../EntIty/Proyectos");
const Fuentes = require("../EntIty/Fuentes");
const Estados = require("../EntIty/Estados");

exports.home = (req,res,next) => {
    res.send("Server listo")
}

exports.getEscuelas = async (req,res,next) =>{
        try {
            const escuelas =  await  Escuelas.findAll({})
            res.json(escuelas)
        }catch (error){
            console.log(error)
            res.status(500).err(error);
            res.json({
                message:"error al crear usuario"
            })
        }
}

exports.getSedes = async (req,res,next) =>{
    try {
        const sedes =  await  Sedes.findAll({})
        res.json(sedes)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}

exports.getProyectos = async (req,res,next) =>{
    try {
        const proyectos =  await  Proyectos.findAll({})
        res.json(proyectos)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}

exports.getFuentes = async (req,res,next) =>{
    try {
        const fuentes =  await  Fuentes.findAll({})
        res.json(fuentes)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}

exports.getEstados = async (req,res,next) =>{
    try {
        const estados =  await  Estados.findAll({})
        res.json(estados)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}