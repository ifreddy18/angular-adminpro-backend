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

const actualizarHospital = async (req, res = response) => {

    const id = req.params.uid;
    const uid = req.uid; // Se tiene acceso al uid de usuario por el validarJWT

    try {

        const hospital = await Hospital.findById( id );

        if (!hospital) {
            return res.status(400).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }
        
        // hospital.name = req.body.name;

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true});

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
};

const borrarHospital = async (req, res = response) => {

    const id = req.params.uid;

    try {

        const hospital = await Hospital.findById( id );

        if (!hospital) {
            return res.status(400).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }
        
        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
};


module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospital
};