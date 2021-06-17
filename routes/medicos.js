/**
 * Rutas: /api/medicos
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require("../controllers/medicos");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getMedicos);

router.post("/", 
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ], 
    crearMedicos
);

router.put("/:uid",
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ], 
    actualizarMedicos
);

router.delete("/:uid", 
    [
        validarJWT
    ],
    borrarMedicos
    );

module.exports = router;
