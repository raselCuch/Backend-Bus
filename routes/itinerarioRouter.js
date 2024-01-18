const { Router } = require("express");

const {
  crearItinerario,
  asignarChofer,
  buscarItinerario,
  registrarPasajero,
  editarPasajero,
  buscarPasajero,
  eliminarPasajero,
} = require("../controllers");

const router = Router();

router.get("/", buscarPasajero);

router.post("/", crearItinerario);
router.post("/", asignarChofer);
router.post("/", registrarPasajero);

router.put("/", buscarItinerario);
router.put("/", editarPasajero);

router.delete("/", eliminarPasajero);

module.exports = router;
