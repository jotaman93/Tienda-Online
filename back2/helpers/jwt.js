'use strict'

const  jwt  = require("jsonwebtoken");

const createToken = (uid, nombres, apellidos, email) =>{

    const payload = { uid, nombres, apellidos, email}
    
    return new Promise ((resolve, reject)=> {

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'24h' //tiempo quue dura el webtoken

        }, (err, token) =>{
            if (err){
                console.log(err);
                reject(err);

            }else{
                resolve(token)
    
            }
        }) 

    });
        
}

module.exports =  {
    createToken
}




