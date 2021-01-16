const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .route("/pessoas")
  .get(PessoaController.pegaTodasAsPessoas)
  .post(PessoaController.criaPessoa);

router.route("/pessoas/ativas").get(PessoaController.pegaPessoasAtivas);

router
  .route("/pessoas/:id")
  .get(PessoaController.pegaUmaPessoa)
  .patch(PessoaController.atualizaPessoa)
  .delete(PessoaController.apagaPessoa);

router.route("/pessoas/:id/restaura").get(PessoaController.restauraPessoa);
router.route("/pessoas/:id/apagada").get(PessoaController.pegaUmaPessoaApagada);

router
  .route("/pessoas/:estudanteId/cancela")
  .get(PessoaController.cancelaPessoa);

module.exports = router;
