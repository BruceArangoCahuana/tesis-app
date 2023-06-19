const Documento = require("../EntIty/Documentos");
const multer = require("multer");
const Estados = require("../EntIty/Estados");
const Sedes = require("../EntIty/Sedes");
const Usuarios = require("../EntIty/Usuarios");
const Portafolio = require("../EntIty/Folios");



//ruta de almacenamiento
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'Public/document')
    },
    filename : function (req,file,cb){
        cb(null,`${Date.now()} - ${file.originalname}`)
    }
})

const upload =multer({storage:storage});
exports.upload = upload.single('path')

//subir documentos
exports.uploadAdd = async(req,res,next) =>{
    const{codigodoc,titulo,fecha_registro,USUARIOIdusuario,ESTADOIdestados,SEDEIdsedes,FOLIOIdfolio}=req.body;
    const path = req.file.filename
    const documentosCount = await Documento.count({ where: { USUARIOIdusuario } })
    if(documentosCount >= 8){
        res.status(500);
        res.json({
            message:"Alcanzo limite de subir archivo"
        })
    }
    const documento = await Documento.create(
        {
            path:path,
            fecha_registro:fecha_registro,
            codigodoc:codigodoc,
            titulo:titulo,
            USUARIOIdusuario:USUARIOIdusuario,
            ESTADOIdestados:ESTADOIdestados,
            SEDEIdsedes:SEDEIdsedes,
            FOLIOIdfolio:FOLIOIdfolio
        })
    try{
        await documento.save()
        res.json({
            message:"Se subio correctamente el docmento"
        })
    }catch (error){
        console.log(error);
        res.status(500);
        res.json({
            message:"error al crear doc"
        })
    }
}

exports.getDocuments = async (req,res,next) =>{
    //let busqueda = req.query.busqueda
    const desde = Number(req.query.desde) || 0
    const registro = 5
    const validPageNumber = desde > 0 ? desde : 1;
    try {
        const documentos =  await  Documento.findAll({
            include: [
                {
                    model: Usuarios,
                    attributes: ['correo']
                },
                {
                    model: Estados,
                    attributes: ['name'],
                },
                {
                    model:Sedes,
                    attributes: ['name']
                }
            ],
            limit:registro,
            offset:(validPageNumber - 1) * registro
        })
        res.json({
            documentos:documentos,
            total: Math.ceil(await  Documento.count() / registro)
        })
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}
exports.getForPorta = async (req,res,next) =>{
    const { idportafolio } = req.params
    try {
        const documentos =  await  Documento.findAll({
            where:{
                FOLIOIdfolio:idportafolio
            },
            include:[{
                model: Estados,
                attributes: ['name'],
            }]
        })
        res.json(documentos)
    }catch (e) {
            console.log(e)
            res.status(500).err(e);
            res.json({
                message:"error al crear usuario"
            })
    }
}
exports.getDocumentsId = async (req,res,next) =>{
   const { id,idportafolio } = req.params;

    try {
        const documentos =  await  Documento.findAll({
            where:{
                USUARIOIdusuario:id,
                FOLIOIdfolio:idportafolio
            },
            include: [
                {
                    model: Usuarios,
                    attributes: ['correo']
                },
                {
                    model: Estados,
                    attributes: ['name'],
                },
                {
                    model:Sedes,
                    attributes: ['name']
                },
                {
                    model:Portafolio
                }
            ],

        })
        res.json(documentos)
    }catch (e) {
        console.log(e)
        res.status(500).err(e);
        res.json({
            message:"error al crear usuario"
        })
    }
}