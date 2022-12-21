'use strict'

const express = require('express');
const { dbConnection } = require('./db/config');
const cliente_route = require('./routes/cliente');
const admin_route = require('./routes/admin');
const bodyparser = require ('body-parser');
require("dotenv").config();

console.log(process.env);

//creo el servidor/app de express
const app = express();

//Base de datos
dbConnection();

//con esto organizo el sistema de accesos para el front y el back que están en puertos diferentes. 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//Lectura y parseo body


app.use(bodyparser.urlencoded({extended:true})); //permite obtener el cuerpo en un json
app.use(bodyparser.json({limit: '50mb', extended:true}));

//Enlaces de routes/ con ***Controller.js a su method
app.use('/api', cliente_route); 
app.use('/api', admin_route); 


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}); //monta el servidor 





//module.exports = app;

