/**
 * Rutas: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
    
);

router.post( '/google', 
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginGoogle
    
);

module.exports = router;

