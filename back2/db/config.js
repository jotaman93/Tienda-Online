const mongoose = require("mongoose");


const dbConnection = async() =>{ //necesito el await por eso async

    try{//por si hay error de base de datos

        await mongoose.connect(process.env.BD_CNN,  {//espera la conexion de BD_CNN
            useNewUrlPArser : true, //documentación de mongoose 
            useUnifiedTopology : true,
            
        });
        console.log('BD Online')

    } catch(error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB'); //si hay error se lanza esto y no funciona nada
    }

}

module.exports = {
    dbConnection
}