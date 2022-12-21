'use strict'

const {response} = require('express');
const bcrypt = require ('bcryptjs'); //hash de la contraseña
const{createToken} = require('../helpers/jwt');
const Cliente = require('../models/cliente');

const registro_cliente = async function(req,res = response){
    
    const {nombres, apellidos, email, pais, password, perfil, telefono, genero, f_nacimiento, dni }= req.body
    //var data = req.body; //recoge la data enviada en el post de cliente.js siguiendo su estructura
    //var clientes_arr = [];
   
    //REGISTRO de CLIENTES 
    
    try{
        //verificar email
        const cliente = await Cliente.findOne({email});
        if(cliente){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
    }   

        //para registrarse
        const dbUser = new Cliente(req.body); 

        //hash de la contraseña
        const salt = bcrypt.genSaltSync(); //10 vueltas para la contraseña
        dbUser.password = bcrypt.hashSync(password, salt); //accedo a dbuser passw y la hashea
                                        //(lo que encriptar, y salt q es nºvueltas)
        
        //generar JWT
        const token = await createToken(dbUser.id, nombres, email, pais);//si todo sale bien crea el token sino error
    
        //crear usuario de BD
        await dbUser.save(); //función para guardar en BD y que espere a tener info

        //Generar respuesta exitosa
        return res.status (201).json({//status 200 exitoso
            ok:true,
            uid: dbUser.id,
            nombres,
            apellidos,
            email,
            pais,
            token,
            email,
            pais,
            perfil, 
            telefono, 
            genero, 
            f_nacimiento, 
            dni

        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}




const login_cliente = async(req, res = response)=>{

    const {email, password } = req.body;

    try {
        const dbUser = await Cliente.findOne({email});

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

        const token = await createToken(dbUser.id, dbUser.nombres, dbUser.email, dbUser.pais)

        return res.json({ //podría devolver un mensaje, pero devuelvo el resultado
            ok: true,
            uid: dbUser.id,
            nombres: dbUser.nombres,
            email,
            pais: dbUser.pais,
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
    registro_cliente,
    login_cliente, 

}