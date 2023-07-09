const Escuelas = require("../EntIty/Escuelas");
const Sedes = require("../EntIty/Sedes");
const Proyectos = require("../EntIty/Proyectos");
const Fuentes = require("../EntIty/Fuentes");
const Estados = require("../EntIty/Estados");
const Roles = require("../EntIty/Roles");
const Usuarios = require("../EntIty/Usuarios");
const Portafolios = require("../EntIty/Folios");
const Documento = require("../EntIty/Documentos");
const Lineas = require("../EntIty/Lineas");
const Sublinea = require("../EntIty/SubLineas");
const Formatos = require("../EntIty/Fomatos");
const MaestroDocumento = require("../EntIty/MaestroDocumento");
const Escuela = require("../EntIty/Escuelas");

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
exports.findALLRevisor = async(req,res,next) =>{
    try {
        const usuarios  =  await  Usuarios.findAll({
            where:{
                ROLEIdroles:3
            },
            attributes: ['idusuario','correo', 'active','ROLEIdroles'],
            include: [
                {model: Roles}
            ]
        })
        res.json(usuarios)
    }catch (error) {
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al traer data"
        })
    }
}

exports.findOneRevisor = async (req,res,next) =>{
    const id = req.params.id
    try {
        const usuarios  =  await  Usuarios.findOne({
            where:{
                ROLEIdroles:id
            },
            attributes: ['idusuario','correo', 'active','ROLEIdroles']
        })
        res.json(usuarios)
    }catch (error) {
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
                {model: Proyectos},
                {model: Fuentes},
                {model: Escuela},
                {model: Sedes}
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

exports.getFormatoAll = async (req, res, next) =>{
    try {
        const formato = await  Formatos.findAll({
            include: [
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
exports.getFormatotodo = async(req, res, next) =>{
    let busqueda = req.query.busqueda
    const desde = Number(req.query.desde) || 0
    const registro = 5
    const validPageNumber = desde > 0 ? desde : 1;
    let whereCondition = {};
    try {
        const formato = await  Formatos.findAll({
            include: [
                {model: Proyectos},
                {model: Fuentes},
                {model: Usuarios,where:
                        busqueda ? { correo: { [Op.like]: `${busqueda}%` } } : {}
                    },
                {model: Sedes},
                {model: Escuela}
            ],
            limit:registro,
            offset:(validPageNumber - 1) * registro
        })
        res.json({
            formato:formato,
            total:Math.ceil(await  Formatos.count() / registro)
        })
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.aprobarDocumento = async (req, res, next) =>{
    const id = req.params.id;
    try {
        await Documento.update(req.body,{
            where:{
                iddocumentos:id
            }
        })
        res.status(200).json({ message: "Se actulizo correctamente" })
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al realizar operacion',
        });
    }
}

exports.findOneIdPortafolio = async(req, res, next) =>{
    const id = req.params.id;
    try {
        const portafolio = await  Portafolios.findOne({
            where:{
                idfolio:id
            }
        })
        res.json(portafolio)
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.getAsignar = async (req, res, next) =>{
    let busqueda = req.query.busqueda
    const desde = Number(req.query.desde) || 0
    const iduser = Number(req.query.iduser)
    const rolid = Number(req.query.rolid)
    const registro = 10
    const validPageNumber = desde > 0 ? desde : 1;
    let whereCondition = {};
    let whereConditionRol = {};
    if (busqueda) {
        whereCondition = {
            correo: {
                [Op.like]: `${busqueda}%`
            }
        };
    }
    try {
        if(rolid==2) {
            const portafolio = await MaestroDocumento.findAll({
                attributes:["USUARIOIdusuario","idmaestro"],
                 include: [
                     {
                         model: Portafolios,
                         include:[
                             {
                                 model: Documento,
                                 include:[
                                     {model:Estados}
                                 ]
                             },
                             {
                                 model: Sedes,
                             }
                         ]
                     },
                     {
                         model:Usuarios,
                         attributes:["idusuario","correo"],
                     }
                 ],
                 group:"USUARIOIdusuario",
                 limit:registro,
                 offset:(validPageNumber - 1) * registro
             })
             res.json({
                 portafolio:portafolio,
                 total:Math.ceil(await  MaestroDocumento.count() / registro)
             })
        }else{
            const portafolio = await  MaestroDocumento.findAll({
                where:{
                    USUARIOIdusuario:iduser
                },
                attributes:["USUARIOIdusuario","idmaestro"],
                 include: [
                     {
                         model: Portafolios,
                         include:[
                             {
                                 model: Documento,
                                 include:[
                                     {model:Estados}
                                 ]
                             }, {
                                 model: Sedes,
                             }
                         ]
                     },
                     {
                         model:Usuarios,
                         attributes:["idusuario","correo"],
                     }
                 ],
                 group:"USUARIOIdusuario",
                 limit:registro,
                 offset:(validPageNumber - 1) * registro
             })
             res.json({
                 portafolio:portafolio,
                 total:Math.ceil(await  MaestroDocumento.count() / registro)
             })
        }
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
}
exports.getOneAsignacion = async (req, res, next) =>{
    const id = req.params.id;
    let busqueda = req.query.busqueda
    const desde = Number(req.query.desde) || 0
    const iduser = Number(id)
    const registro = 10
    const validPageNumber = desde > 0 ? desde : 1;
    let whereCondition = {};
    let whereConditionRol = {};

    try {

        const portafolio = await  MaestroDocumento.findAll({
            where:{
                USUARIOIdusuario:id
            },
            attributes:["idmaestro"],
            include: [
                {
                    model: Portafolios,
                    include:[
                        {
                            model: Documento,
                            include:[
                                {model:Estados}
                            ]
                        },
                        {
                            model: Sedes,
                        },
                        {
                            model: Escuelas,
                        }
                    ]
                },
                {
                    model:Usuarios,
                    attributes:["idusuario","correo"]
                }
            ],
            limit:registro,
            offset:(validPageNumber - 1) * registro
        })
        res.json(
            {
                portafolio:portafolio,
                total:Math.ceil(await  MaestroDocumento.count() / registro)
            }
        )
    }catch (error) {
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
        const formato = await  Formatos.findOne({
            where:{
                USUARIOIdusuario:id,
                idformato:iddetalle
            },
            include: [
                {model:Lineas},
                {model:Sublinea},
                {model: Proyectos},
                {model: Fuentes},
                {model:Escuela}
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
exports.findOneFormatoId = async(req, res, next) =>{
    const id = req.params.id;
    try {
        const formato = await  Formatos.findOne({
            where:{
                idformato:id
            },
            include: [
                {model:Lineas},
                {model:Sublinea},
                {model: Proyectos},
                {model: Fuentes},
                {model:Escuela}
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
exports.editFormato = async(req, res, next) =>{
    const id = req.params.id;
    const  idformato = req.params.iddetalle;

    try {
        await Formatos.update(req.body,{
            where:{
                USUARIOIdusuario:id,
                idformato:idformato
            }
        })

        res.json({message:'Se actulizo correctamente'})
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al actualizar documento',
        });
    }
}

exports.editFormatoId = async(req, res, next) =>{
    const idformato = req.params.id;


    try {
        await Formatos.update(req.body,{
            where:{
                idformato:idformato
            }
        })

        res.json({message:'Se actulizo correctamente'})
    }catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al actualizar documento',
        });
    }
}
exports.getPorfolio = async (req, res, next) => {
    const id = req.params.id;
    let busqueda = req.query.busqueda;
    const desde = Number(req.query.desde) || 0;
    const registro = 5;
    const validPageNumber = desde > 0 ? desde : 1;

    try {
        const usuario = await Portafolios.findOne({
            where:{
                USUARIOIdusuario: id,
            }
        })
        if(usuario){
            const folio = await Portafolios.findAll({
                where:  {
                    USUARIOIdusuario: id,
                    name: {
                        [Op.like]: `${busqueda}%`,
                    },
                },
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
                total: Math.ceil(await Documento.count({
                    where:  {
                        USUARIOIdusuario: id
                    }
                }) / registro),
            });
        }else {
            res.json({
                folio:[],
                total: Math.ceil(await Documento.count() / registro)
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).err(error);
        res.json({
            message: 'Error al traer data',
        });
    }
};
exports.getAllPorfolio = async (req, res, next) =>{

    try {
        const portafolio = await Portafolios.findAll({
            include:[
                {model:Sedes}
            ]
        });
        res.json(portafolio)
    }catch (e) {
        return  res.status(500).json({message:"erro"})
    }
}
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
    }catch (err) {
        console.log(err)
        res.status(500).err(err);
        res.json({
            message:"error al eliminar"
        })
    }
}


exports.createFormato = async (req,res,next) =>{
    const formato = new Formatos(req.body)
    try {
        await  formato.save()
        res.json({
            message:"Se creo correctamente el formato"
        })
    }catch (error){
        console.log(error)
        res.status(500)
        res.json({
            message:"error al crear"
        })
    }
}

exports.asignar = async (req,res,next) =>{
    const  asignar= new MaestroDocumento(req.body)
    try {
        await  asignar.save()
        res.json({
            message:"Se aigno el revisor correctamente"
        })
    }catch (err) {
        console.log(err)
        res.status(500).err(err);
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
        console.log(err)
        res.status(500).err(err);
        res.json({
            message:"error al crear"
        })
    }
}