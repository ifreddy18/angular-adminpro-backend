// Importaciones
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config'); //DB con destructuracion de objetos

// Crear el servidor de Express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));


// app.get( '/api/usuarios', (req, res) => {
//     res.json({
//         ok: true,
//         msg: "Hola mundo",
//         usuarios: [{
//             id: 123,
//             nombre: 'Freddy'
//         }]
//     });
// });


app.listen( process.env.port, () => {
    console.log('Servidor levantado en el puerto ' + process.env.port);
});