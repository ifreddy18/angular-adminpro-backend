const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, "email name");

    res.json({
        ok: true,
        msg: "get Usuarios",
        usuarios,
        uid: req.uid,
    });
};

const crearUsuario = async (req, res = response) => {

    const { password, email } = req.body;

    try {

        const emailExist = await Usuario.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //  Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: "Crear Usuarios",
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const actualizarUsuario = async (req, res = response) => {
    
    // TODO: validar token y comprobar si es usuario correcto

    const uid = req.params.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }

        // Actualizacion
        const { password, google, email, ...campos } = req.body;

        // Para evitar que choque el email unico
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email",
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} ); 
        // { new: true } para que regrese el usuario nuevo en lugar del viejo (opcion de defecto mongoose)

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: `Usuario borrado: ${uid}`,
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }

};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
};
