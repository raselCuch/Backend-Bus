const { Router } = require("express");

const {
  busGet,
  busPut,
  busGetId,
  busPost,
  busDelete,
  busDeleteAsientos,
} = require("../controllers");

const router = Router();

router.get("/:id", busGetId);//obtener uno
router.get("/", busGet);//obtener todo

router.put("/:id", busPut);//editar

router.post("/", busPost);//generar

router.delete("/:id", busDelete);//eliminar
router.delete("/:id/asientos", busDeleteAsientos);

module.exports = router;
