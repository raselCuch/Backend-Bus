const { Router } = require("express");

const {
  usuariosGet,
  usuarioGetId,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers");

const router = Router();

router.get("/", usuariosGet);
router.get("/:id", usuarioGetId);

// router.put("/", usuariosPut);
router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/:id", usuariosDelete);

module.exports = router;
