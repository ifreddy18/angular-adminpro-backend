const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                        .populate('usuario', 'name')
                        .populate('hospital', 'name');
    res.json({
        ok: true,
        medicos
    });
};

const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();
        

        res.json({
            ok: true,
            msg: 'crearMedicos',
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarMedicos = async (req, res = response) => {

    const id = req.params.uid;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( id );

        if (!medico) {
            res.json({
                ok: true,
                msg: 'El medico no fue encotrado por ID',
                id
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new:true});


        res.json({
            ok: true,
            msg: 'actualizarMedicos',
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
};

const borrarMedicos = async (req, res = response) => {

    const id = req.params.uid;

    try {

        const medico = await Medico.findById( id );

        if (!medico) {
            res.json({
                ok: true,
                msg: 'El medico no fue encotrado por ID',
                id
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado',
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
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
};