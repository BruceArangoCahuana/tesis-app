const jwt = require("jsonwebtoken");
require("dotenv").config({path:"variable.env"})

module.exports = (req,res,next) =>{
    const authHeader = req.get("Authorization");

    //validamoa la autorizacion
    if(!authHeader){
        const error = new Error('No Autorizado');
        error.statusCode(401);
        throw  error;
    }

    //validar datos del token
    const token = authHeader.split(" ")[1];
    let revisar;
    try {
        revisar =  jwt.verify(token,process.env.KEYS)
    }catch (error){
        error.statusCode = 500;
        throw  error;
    }

    //revicion del token valido
    if(!revisar){
        const error =  new Error('No Autorizado');
        error.statusCode = 401 ;
        throw  error;
    }
    next();
}