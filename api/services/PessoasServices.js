const db = require("../models");
const Services = require("./Services");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");

    this.matriculas = new Services("Matriculas");
  }

  pegaRegistrosAtivos(where = {}) {
    return db[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  pegaTodosOsRegistros(where = {}) {
    return db[this.nomeDoModelo]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  cancelaPessoaEMatriculas(estudanteId) {
    return db.sequelize.transaction(async (t) => {
      await super.atualizaRegistro({ ativo: false }, Number(estudanteId), {
        transaction: t,
      });

      await this.matriculas.atualizaRegistros(
        { status: "cancelado" },
        { estudante_id: Number(estudanteId) },
        { transaction: t }
      );
    });
  }
}

module.exports = PessoasServices;
