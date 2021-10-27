const { Router } = require("express");
const router = Router();

const {
  exportacion,
  actualizar,
  getvotacion,
  insertvoto,
  getpartpoli,
  login,
} = require("../controllers/index.controller");

router.get("/usuario/:rut", getvotacion);
router.post("/usuario/:rut/votacion", insertvoto);
router.get("/partido/:rut", getpartpoli);
router.get("/login", login);
router.get("/partido/:rut/exportacion", exportacion);
router.get("/partido/:rut/actualizar", actualizar);

module.exports = router;
