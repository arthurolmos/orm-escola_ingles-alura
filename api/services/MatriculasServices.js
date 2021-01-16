const Services = require("./Services");
const db = require("../models");

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas");
  }

  apagaMatricula(where = {}) {
    return db[this.nomeDoModelo].destroy({ where: { ...where } });
  }

  restauraMatricula(where = {}) {
    return db[this.nomeDoModelo].restore({ where: { ...where } });
  }
}

module.exports = MatriculasServices;
