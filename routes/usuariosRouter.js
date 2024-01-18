const { Router } = require("express");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers");

const router = Router();

router.get("/", usuariosGet);

router.put("/", usuariosPut);

router.post("/", usuariosPost);

router.delete("/:id", usuariosDelete);

module.exports = router;
