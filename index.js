// Importaciones
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config'); //DB con destructuracion de objetos

// Crear el servidor de Express
const app = express();

// Configurar CORS
app.use( cors() );

// Base de datos
dbConnection();


// console.log( process.env );


app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: "Hola mundo"
    });

});


app.listen( process.env.port, () => {
    console.log('Servidor levantado en el puerto ' + process.env.port);
});