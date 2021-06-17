/**
 * Rutas: /api/hospitales
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospital,
} = require("../controllers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getHospitales);

router.post(
    "/",
    [
        validarJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearHospitales,
);

router.put("/:uid", 
    [
        validarJWT,
        check('name', 'El nombre es del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarHospital);

router.delete("/:uid", 
    [
        validarJWT
    ],
    borrarHospital
);

module.exports = router;
