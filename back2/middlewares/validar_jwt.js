
const { response } = require('express'); // se importa express xq es necesario
const jwt = require ('jsonwebtoken');




const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token'); //token personalizado más seguro

    if( !token ){ //si no existe le digo que user no validado
        return res.status(401).json({
            ok:false,
            msg: 'error en el token'
        });
    }

    try{
        //como argumento lleva el token y la secret key
       const {uid, nombres} = jwt.verify(token, process.env.SECRET_JWT_SEED);
       //esta req es la misma q va a auth.js controladores 
       req.uid  = uid;
       req.nombres = nombres;

    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }



    //si todo sale bien
        next();

}




module.exports = {
    validarJWT
}