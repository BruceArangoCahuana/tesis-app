const express =  require("express");
const router = express.Router();
const HomeController = require("../Controller/HomeController")
const AutenticacionController = require("../Controller/AutenticacionController")

module.exports =  () =>{
    router.get("/",HomeController.home);

    //inicio de session y creaacion user
    router.post("/create-user",AutenticacionController.createUser);
    router.post("/login-user",AutenticacionController.loginUser);
    return router;
}