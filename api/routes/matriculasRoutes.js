const { Router } = require("express");
const MatriculaController = require("../controllers/MatriculaController");

const router = Router();

router.route("/matriculas").get(MatriculaController.pegaTodasAsMatriculas);

router
  .route("/pessoas/:estudanteId/matriculas")
  .get(MatriculaController.pegaMatriculas)
  .post(MatriculaController.criaMatricula);

router
  .route("/pessoas/:estudanteId/matriculas/:matriculaId")
  .get(MatriculaController.pegaUmaMatricula)
  .patch(MatriculaController.atualizaMatricula)
  .delete(MatriculaController.apagaMatricula);

router
  .route("/pessoas/:estudanteId/matriculas/?:matriculaId/restaura")
  .get(MatriculaController.restauraMatricula);

router
  .route("/pessoas/matriculas/lotadas")
  .get(MatriculaController.pegaTurmasLotadas);

router
  .route("/pessoas/matriculas/:turmaId/confirmadas")
  .get(MatriculaController.pegaMatriculasPorTurma);

module.exports = router;
