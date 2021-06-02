const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email no valido",
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña no valida",
            });
        }

        // Generar un token
        const token = await generarJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const loginGoogle = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if ( !usuarioDB ) {
            // Si no existe el usuario
            usuario = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Si existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en base de datos
        await usuario.save();

        // Generar un token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: 'Google Sign In',
            name, email, picture,
            token
        });

    } catch (error) {

        console.error(error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto',
        });
    }

    
};

module.exports = {
    login,
    loginGoogle
};
