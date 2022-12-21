'use strict'

const {response} = require('express');
const bcrypt = require ('bcryptjs'); //hash de la contraseña
const{createToken} = require('../helpers/jwt');
const Admin = require('../models/admin');

const registro_admin = async function(req, res = response){
    
    const {nombres, apellidos, email, password, telefono, rol, dni }= req.body
    //var data = req.body; //recoge la data enviada en el post de cliente.js siguiendo su estructura
    //var clientes_arr = [];
   
    //REGISTRO de CLIENTES 
    
    try{
        //verificar email
        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
    }   

        //para registrarse
        const dbUser = new Admin(req.body); 

        //hash de la contraseña
        const salt = bcrypt.genSaltSync(); //10 vueltas para la contraseña
        dbUser.password = bcrypt.hashSync(password, salt); //accedo a dbuser passw y la hashea
                                        //(lo que encriptar, y salt q es nºvueltas)
        
        //generar JWT
        const token = await createToken(dbUser.id, nombres, email);//si todo sale bien crea el token sino error
    
        //crear usuario de BD
        await dbUser.save(); //función para guardar en BD y que espere a tener info

        //Generar respuesta exitosa
        return res.status(201).json({//status 200 exitoso
            ok:true,
            uid: dbUser.id,
            nombres, 
            apellidos, 
            email, 
            password, 
            telefono, 
            rol, 
            dni,
            token,

        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}




const login_admin = async(req, res = response)=>{

    const {email, password } = req.body;

    try {
        const dbUser = await Admin.findOne({email});

        if ( !dbUser ){
            return res.status(400).json({
            ok:false,
            msg: 'Email no válido'
        });
        }

        //confirmar si password hace match con la encriptada x eso bcrypt
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            }); //si ya ha pasado esta fase, email y password ahora genero JWT
        }
        // generar JWT

        const token = await createToken(dbUser.id, dbUser.nombres, dbUser.email)

        return res.json({ //podría devolver un mensaje, pero devuelvo el resultado
            ok: true,
            uid: dbUser.id,
            nombres: dbUser.nombres,
            email,
            token,
            

        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }

    
}


module.exports = { //exporto todas las funciones de cliente
    registro_admin,
    login_admin, 

}