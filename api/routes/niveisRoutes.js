const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();

router
  .route("/niveis")
  .get(NivelController.pegaTodosOsNiveis)
  .post(NivelController.criaNivel);

router
  .route("/niveis/:id")
  .get(NivelController.pegaUmNivel)
  .patch(NivelController.atualizaNivel)
  .delete(NivelController.apagaNivel);

router.route("/niveis/:id/restaura").get(NivelController.restauraNivel);

module.exports = router;
