const { Router } = require("express");
const router = Router();

const {
  estadistica,
  validacionVoto,
} = require("../controllers/index.controller");

router.get("/prensa", estadistica);
router.get("/users/:id", validacionVoto);

module.exports = router;
