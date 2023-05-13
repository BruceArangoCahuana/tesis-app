const express =  require("express");
const router = express.Router();
const HomeController = require("../Controller/HomeController")


module.exports =  () =>{
    router.get("/",HomeController.home);
    return router;
}