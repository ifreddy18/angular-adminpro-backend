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
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/upload', require('./routes/uploads'));




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