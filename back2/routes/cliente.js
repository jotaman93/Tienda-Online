'use strict'

var express =require('express');
var clienteController = require ('../controllers/ClienteController');

var api = express.Router();

//ruta de la petición
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente); 

module.exports = api;