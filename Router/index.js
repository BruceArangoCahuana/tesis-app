const express =  require("express");
const router = express.Router();
const HomeController = require("../Controller/HomeController");
const AutenticacionController = require("../Controller/AutenticacionController");
const Uploadfile = require("../Controller/Uploadfile");

module.exports =  () =>{
    router.get("/",HomeController.home);

    // cargar documentos
    router.post("/upload",
        Uploadfile.upload,
        Uploadfile.uploadAdd);
    router.get("/documentos", Uploadfile.getDocuments);
    router.get("/documentos/detalle/:idportafolio", Uploadfile.getForPorta);
    router.get("/documentos/detail/:id/:idportafolio", Uploadfile.getDocumentsId);

    // traer escuelas,sedes,proyectos,fuentes y estados
    router.get("/escuelas",HomeController.getEscuelas);
    router.get("/sedes",HomeController.getSedes);
    router.get("/proyectos",HomeController.getProyectos);
    router.get("/fuentes",HomeController.getFuentes);
    router.get("/estados",HomeController.getEstados);
    router.get("/roles",HomeController.getRoles);
    router.get("/porfolio/:id",HomeController.getPorfolio);
    router.get("/porfolio/todo/:idname",HomeController.getPorfolioName);
    router.get("/lineas",HomeController.getLineas);
    router.get("/sub-lineas",HomeController.getSubLineas);
    router.get("/detalle-formato/:id",HomeController.getDetelleFormato);
    router.get("/getFormato/:id",HomeController.getFormatoUser);
    router.get("/findOnedetalle/:id/:iddetalle",HomeController.findOneFormato);
    router.get("/porfolio-all/todo",HomeController.getAllPorfolio);



    router.post("/porfolio",HomeController.createPortafolio);
    router.post("/formato",HomeController.createDetalleFormato);
    router.post("/formato-parcial",HomeController.createFormato);
    router.post("/asignar",HomeController.asignar);
    router.post("/aprobar/portafolio/:id",HomeController.aprobarDocumento);


    router.get("/user",HomeController.getUser);
    router.put("/user/:id",HomeController.resetAtive);
    router.delete("/user/:id",HomeController.deleteAtive);
    router.get("/revisor",HomeController.findALLRevisor);
    router.get("/revisor/:id",HomeController.findOneRevisor);
    router.get("/porfolio-one/:id",HomeController.findOneIdPortafolio);
    router.get("/asignar",HomeController.getAsignar);
    router.get("/asignar/:id",HomeController.getOneAsignacion);

    //inicio de session y creaacion user
    router.post("/create-user",AutenticacionController.createUser);
    router.post("/login-user",AutenticacionController.loginUser);

    return router;
}