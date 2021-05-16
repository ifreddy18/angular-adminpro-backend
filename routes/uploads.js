/**
 * Rutas: /api/upload/
 */
const { Router } = require("express");
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImagen } = require("../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload); // tipo = usuarios/hospiales/medicos

router.get("/:tipo/:imagen", getImagen); // tipo = usuarios/hospiales/medicos



module.exports = router;