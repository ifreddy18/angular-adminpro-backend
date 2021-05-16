const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                .populate('usuario', 'name email img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospitales = async (req, res = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body 
    });


    try {
        
        const hospitalDB = await hospital.save();
        

        res.json({
            ok: true,
            msg: 'crearHospitales',
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};


module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospital
};