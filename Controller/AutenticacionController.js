const Usuarios = require("../EntIty/Usuarios");
const jwt = require("jsonwebtoken");
const  bcrypt = require("bcrypt");
require("dotenv").config({path:"variable.env"})

exports.createUser = async (req,res,next) =>{

    try {
        const usuario = new Usuarios(req.body);
        usuario.password = await  bcrypt.hash(req.body.password,12);
        //validacion si ya exite usuario
        const user =  await Usuarios.findOne({
            where:{
                correo:usuario.correo
            }
        })
        if (user){
            res.status(500);
            res.json({
                message:"El usuario ya existe"
            })
        }

        await  usuario.save();
        res.json({
            message:"Usuario creado exitosamente"
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            message:"error al crear usuario o  campos vacios"
        });

    }
}

exports.loginUser = async (req,res,next) =>{
    const{correo,password,ROLEIdroles} = req.body

    try {
        const traerUsuario = await Usuarios.findOne({
            where:{
                correo:correo,
                ROLEIdroles:ROLEIdroles
            }
        });
        //validamos usuario
        if(!traerUsuario){
            await  res.status(401).json({
                message:"El usuario no existe"
            });
            next();
        }else{
            if(!bcrypt.compareSync(password,traerUsuario.password)){
                await  res.status(401).json({
                    message:"Contraseña incorrecta o usuario incorrecto"
                });
                next();
            }else{
                //el usuario es correcto
                await  traerUsuario.update({
                    active:1
                })
                const token = jwt.sign({
                    correo: traerUsuario.correo,
                    active:1,
                    idusuario: traerUsuario.idusuario,
                    ROLEIdroles:traerUsuario.ROLEIdroles
                },process.env.KEYS,{
                    expiresIn:process.env.EXPIRACION
                });

                //retornamod el token para el frontend
                res.json({
                    message:"Inicio de session correctamenta",
                    token:token,
                    idusuario:traerUsuario.idusuario,
                    correo:traerUsuario.correo,
                    ROLEIdroles:traerUsuario.ROLEIdroles,
                    active:1
                });
            }
        }
    }catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message:"Error de inicio de session usuario o contraseña"
        })
    }
}