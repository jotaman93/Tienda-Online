'use strict'

const { Schema, model } = require("mongoose");

var AdminSchema = Schema({
    nombres:{
        type: String, 
        required:true
    },
    apellidos:{
        type: String,
        required:true
    },
    email:{
        type: String, 
        required:true,
        unique: true
    },
    password:{
        type: String, 
        required:true
    },
    telefono:{
        type: String, 
        required:true
    },
    rol:{
        type: String, 
        required:true
    },
    dni:{
        type: String, 
        required:true,
        unique: true
    },
})

module.exports = model('Admin', AdminSchema);
