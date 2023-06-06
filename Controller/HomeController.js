const Escuelas = require("../EntIty/Escuelas");
const Sedes = require("../EntIty/Sedes");
const Proyectos = require("../EntIty/Proyectos");
const Fuentes = require("../EntIty/Fuentes");
const Estados = require("../EntIty/Estados");
const Roles = require("../EntIty/Roles");
const Usuarios = require("../EntIty/Usuarios");
const Portafolios = require("../EntIty/Folios");
const Documento = require("../EntIty/Documentos");
const DetalleFormato = require("../EntIty/DetalleFormato");
const Lineas = require("../EntIty/Lineas");
const Sublinea = require("../EntIty/SubLineas");
const Formatos = require("../EntIty/Fomatos");



const { Op } = require('sequelize');

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

exports.getUser = async (req,res,next)=>{
    let busqueda = req.query.busqueda
    const desde = Number(req.query.desde) || 0
    const registro = 5
    const validPageNumber = desde > 0 ? desde : 1;
    let whereCondition = {};
    if (busqueda) {
        whereCondition = {
            correo: {
                [Op.like]: `${busqueda}%`
            }
        };
    }
    try {
        const usuarios  =  await  Usuarios.findAll({
            where:whereCondition,
            attributes: ['idusuario','correo', 'active','ROLEIdroles'],
            include: [
                {model: Roles}
            ],
            limit:registro,
            offset:(validPageNumber - 1) * registro
        })
        res.json({
            usuarios:usuarios,
            total: Math.ceil(await  Usuarios.count() / registro)
        })
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al traer data"
        })
    }
}

exports.getRoles = async (req,res,next) =>{
    try {
        const roles =  await  Roles.findAll({})
        res.json(roles)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al traer data"
        })
    }
}
exports.getPorfolioName = async ( req,res,next ) =>{
    const id = req.params.idname
    try {
        const portafolio =  await  Portafolios.findAll({
            where:{
                USUARIOIdusuario:id
            }
        })
        res.json(portafolio)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al traer data"
        })
    }
}

exports.getLineas = async ( req,res,next ) =>{
    try {
        const lineas = await  Lineas.findAll({})
        res.json(lineas)
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}

exports.getSubLineas = async  (req,res,next) =>{
    try {
        const sublineas = await  Sublinea.findAll({})
        res.json(sublineas)
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.getDetelleFormato = async (req, res, next) =>{
    const id = req.params.id;
    try {
        const sublineas = await  DetalleFormato.findOne({
            where:{
                USUARIOIdusuario:id
            }
        })
        res.json(sublineas)
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.getFormatoUser = async(req, res, next) =>{
    const id = req.params.id;
    try {
        const formato = await  Formatos.findAll({
            where:{
                USUARIOIdusuario:id
            },
            include: [
                {model: DetalleFormato},
                {model: Proyectos},
                {model: Fuentes}
            ]
        })
        res.json(formato)
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}

exports.findOneFormato = async (req, res, next) =>{
    const id = req.params.id;
    const  iddetalle = req.params.iddetalle;
    try {
        const formato = await  Formatos.findAll({
            where:{
                USUARIOIdusuario:id,
                idformato:iddetalle
            },
            include: [
                {model: DetalleFormato,
                    include: [
                        {model:Lineas},
                        {model:Sublinea}
                    ]},
                {model: Proyectos},
                {model: Fuentes}
            ]
        })
        res.json(formato)
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.getPorfolio = async (req, res, next) => {
    const id = req.params.id;
    let busqueda = req.query.busqueda;
    let codigoFolio = req.query.date;
    const desde = Number(req.query.desde) || 0;
    const registro = 5;
    const validPageNumber = desde > 0 ? desde : 1;
    let whereCondition = {};

    if (busqueda) {
        whereCondition = {
            USUARIOIdusuario: id,
            name: {
                [Op.like]: `${busqueda}%`,
            },
        }
    }

    try {
        const folio = await Portafolios.findAll({
            where: whereCondition,
            attributes: ['idfolio', 'fecha_registro', 'codigofolio', 'name', 'interesados'],
            include: [
                {
                    model: Documento,
                    include: [
                        {
                            model: Usuarios,
                            attributes: ['correo'],
                        },
                        {
                            model: Estados,
                            attributes: ['name'],
                        },
                        {
                            model: Sedes,
                            attributes: ['name'],
                        },
                        {
                            model: Portafolios,
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: Usuarios,
                    attributes: ['correo'],
                },
                {
                    model: Sedes,
                    attributes: ['name'],
                },
            ],
            limit: registro,
            offset: (validPageNumber - 1) * registro,
        });

        res.json({
            folio: folio,
            total: Math.ceil(await Documento.count() / registro),
        });
    } catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
};

exports.resetAtive = async (req,res,next) =>{
    const id = req.params.id
    try {
        const traerUsuario = await Usuarios.findOne({
            where:{
                idusuario:id
            }
        });
        await  traerUsuario.update({
            active:0
        })
        res.status(200).json({message:"ok"})
    }catch (e) {
        return  res.status(500).json({message:"ok"})
    }
}

exports.deleteAtive = async(req,res,next) =>{
    const id = req.params.id
    try {
        await Usuarios.destroy({
            where:{
                idusuario:id
            }
        })
        res.status(200).json({
            message:"error al crear usuario"
        })
    }catch (e) {
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al eliminar"
        })
    }
}
exports.createDetalleFormato = async (req,res,next) =>{
    const formato = new DetalleFormato(req.body)
    try {
        await  formato.save()
        res.json({
            message:"Se creo correctamente el detalle formato",
            idFormat: formato.iddetallefo
        })
    }catch (error){
        console.log(error)
        res.status(500)
        res.json({
            message:"error al crear"
        })
    }
}

exports.createFormato = async (req,res,next) =>{
    const formato = new Formatos(req.body)
    try {
        await  formato.save()
        res.json({
            message:"Se creo correctamente el formato",
            idFormat: formato.iddetallefo
        })
    }catch (error){
        console.log(error)
        res.status(500)
        res.json({
            message:"error al crear"
        })
    }
}

exports.createPortafolio = async(req,res,next) =>{
    const portafolio = new Portafolios(req.body)
    try {
        await  portafolio.save()
        res.json({
            message:"Se creo correctamente el portafolio"
        })
    }catch (err) {
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear"
        })
    }
}