const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped() //devuelve descripción del error 400
        }); 
    }    
    next(); //se ejecuta cuando no hay un error xq es secuencial
}

module.exports = {
    validarCampos
}