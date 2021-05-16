const path = require('path'); // Viene en node
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo no valido'
        });
    }

    // Validar si hay archivo (codigo extraido de express-fileUpload)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    file.mv(path, (error) => {
        
        if (error) { 
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            }); 
        }

        // Carga de imagen a base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'fileUpload',
            nombreArchivo
        });
    });

};



const getImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }` );

    if ( fs.existsSync(pathImg) ) {
        res.sendFile( pathImg );
    } else {
        res.sendFile( path.join( __dirname, `../uploads/no-img.jpg` ) );
    }

};

module.exports = {
    fileUpload,
    getImagen
};