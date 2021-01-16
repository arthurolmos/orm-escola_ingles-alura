const db = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  pegaTodosOsRegistros(where = {}) {
    console.log("here");

    return db[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  pegaUmRegistroPorId(id) {
    return db[this.nomeDoModelo].findByPk(Number(id));
  }

  pegaUmRegistro(where = {}) {
    return db[this.nomeDoModelo].findOne({ where: { ...where } });
  }

  encontraEContaRegistros(where = {}, agregadores) {
    return db[this.nomeDoModelo].findAndCountAll({
      where: { ...where },
      ...agregadores,
    });
  }

  criaRegistro(dados) {
    return db[this.nomeDoModelo].create(dados);
  }

  atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return db[this.nomeDoModelo].update(
      dadosAtualizados,
      { where: { id } },
      transacao
    );
  }

  atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    console.log("where", where);
    return db[this.nomeDoModelo].update(
      dadosAtualizados,
      { where: { ...where } },
      transacao
    );
  }

  apagaRegistro(id) {
    return db[this.nomeDoModelo].destroy({ where: { id: Number(id) } });
  }

  restauraRegistro(id) {
    return db[this.nomeDoModelo].restore({ where: { id: Number(id) } });
  }

  consultaRegistroApagado(id) {
    return db[this.nomeDoModelo].findByPk(id, { paranoid: false });
  }
}

module.exports = Services;
