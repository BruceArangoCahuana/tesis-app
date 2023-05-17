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

    // traer escuelas,sedes,proyectos,fuentes y estados
    router.get("/escuelas",HomeController.getEscuelas);
    router.get("/sedes",HomeController.getSedes);
    router.get("/proyectos",HomeController.getProyectos);
    router.get("/fuentes",HomeController.getFuentes);
    router.get("/estados",HomeController.getEstados);


    //inicio de session y creaacion user
    router.post("/create-user",AutenticacionController.createUser);
    router.post("/login-user",AutenticacionController.loginUser);
    return router;
}