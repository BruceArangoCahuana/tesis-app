const Documento = require("../EntIty/Documentos");
const multer = require("multer");
const Escuelas = require("../EntIty/Escuelas");


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
    const{nombre,interesados,USUARIOIdusuario,ESTADOIdestados}=req.body;
    const path = req.file.filename
    const documento = await Documento.create(
        { nombre: nombre,
            interesados:interesados,
            USUARIOIdusuario:USUARIOIdusuario,
            ESTADOIdestados:ESTADOIdestados,
            path:path
        })
    try{
        await documento.save()
        res.json({
            message:"Se subio correctamente el docmento"
        })
    }catch (error){
        console.log(error);
        res.status(500).err(error);
        res.json({
            message:"error al crear doc"
        })
    }

}

exports.getDocuments = async (req,res,next) =>{
    try {
        const documentos =  await  Documento.findAll({})
        res.json(documentos)
    }catch (error){
        console.log(error)
        res.status(500).err(error);
        res.json({
            message:"error al crear usuario"
        })
    }
}