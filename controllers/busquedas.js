const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getResultados = async (req, res = response) => {

    const query = req.params.query;

    const regex = new RegExp( query, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ name: regex }),
        Medico.find({ name: regex }),
        Hospital.find({ name: regex })
    ]);

    // Agregar todos los resultados en un solo array
    var resultado = [];
    resultado.push.apply(resultado, usuarios);
    resultado.push.apply(resultado, medicos);
    resultado.push.apply(resultado, hospitales);

    res.json({
        ok: true,
        msg: 'getResultados',
        query,
        resultado
    });


};

const getResultadosDeColleccion = async (req, res = resposne) => {

    const tabla = req.params.tabla;
    const query = req.params.query;

    const regex = new RegExp( query, 'i');

    let resultado;

    switch (tabla) {
        case 'usuarios':
            resultado = await Usuario.find({ name: regex })
                                     .populate('usuario', 'name img');
            break;
    
        case 'medicos':
            resultado = await Medico.find({ name: regex })
                                    .populate('usuario', 'name img')
                                    .populate('hospital', 'name img');
            break;
        
        case 'hospitales':
            resultado = await Hospital.find({ name: regex })
                                      .populate('usuario', 'name img');
            break;
        
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales',
            });
    }

    let jsonResponse = {
        ok: true,
        msg: 'getResultadosDeColleccion',
    };

    jsonResponse[tabla] = resultado;

    res.json(jsonResponse);
};

module.exports = {
    getResultados,
    getResultadosDeColleccion
};