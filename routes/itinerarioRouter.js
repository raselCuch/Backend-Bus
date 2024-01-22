const { Router } = require("express");

const {
  getItinerario,
  crearItinerario,
  asignarChofer,
  buscarItinerario,
  registrarPasajero,
  editarPasajero,
  buscarPasajero,
  eliminarPasajero,
} = require("../controllers");

const router = Router();

router.get("/", getItinerario);
router.get("/fecha/", buscarItinerario);
router.post("/", crearItinerario);
// router.get("/", buscarPasajero);

router.put("/asignar-chofer/", asignarChofer);

// router.get("/", buscarPasajero);
router.get("/pasajero/", buscarPasajero);//
router.post("/pasajero/", registrarPasajero);//
router.put("/pasajero/", editarPasajero);
router.delete("/pasajero/", eliminarPasajero);

module.exports = router;
