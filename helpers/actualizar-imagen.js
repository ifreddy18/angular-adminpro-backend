const fs = require('fs');

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const borrarImagen = ( tipo, img ) => {

    let pathViejo = `./uploads/${ tipo }/${ img }`;
    // Las siguientes lineas son con el FileSystem 'fs'
    // Sirven para comprobar si existe el archivo del pathViejo y
    // eliminarlo en caso de que exista
    if( fs.existsSync( pathViejo ) ) {
        // Elimina path viejo
        fs.unlinkSync( pathViejo ); 
    }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    switch (tipo) {
        case "medicos":
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('El ID no pertenece a un medico');
                return false;
            }

            borrarImagen( tipo, medico.img );
            
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case "usuarios":

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('El ID no pertenece a un usuario');
                return false;
            }

            borrarImagen( tipo, usuario.img );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

        case "hospitales":

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('El ID no pertenece a un hospital');
                return false;
            }

            borrarImagen( tipo, hospital.img );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        default:
            break;
    }
};

module.exports = {
    actualizarImagen,
};
