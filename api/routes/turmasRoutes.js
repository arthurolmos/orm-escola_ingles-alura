const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
  .route("/turmas")
  .get(TurmaController.pegaTodasAsTurmas)
  .post(TurmaController.criaTurma);

router
  .route("/turmas/:id")
  .get(TurmaController.pegaUmaTurma)
  .patch(TurmaController.atualizaTurma)
  .delete(TurmaController.apagaTurma);

router.route("/turmas/:id/restaura").get(TurmaController.restauraTurma);

module.exports = router;
