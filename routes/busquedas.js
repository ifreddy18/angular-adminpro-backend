/**
 * Rutas: /api/todo
 */
const { Router } = require("express");
const { getResultados, getResultadosDeColleccion } = require("../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:query", validarJWT, getResultados);
router.get("/colleccion/:tabla/:query", validarJWT, getResultadosDeColleccion);


module.exports = router;