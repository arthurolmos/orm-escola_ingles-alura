const Op = require("sequelize").Op;
const { TurmasServices } = require("../services");
const turmasServices = new TurmasServices();

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    try {
      const { data_inicial, data_final } = req.query;
      const where = {};

      data_inicial || data_final ? (where.data_inicio = {}) : null;
      data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
      data_final ? (where.data_inicio[Op.lte] = data_final) : null;

      const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where);

      return res.status(200).json(todasAsTurmas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaTurma(req, res) {
    try {
      const { id } = req.params;
      const umaTurma = await turmasServices.pegaUmRegistroPorId(id);

      return res.status(200).json(umaTurma);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaTurma(req, res) {
    try {
      const novaTurma = req.body;
      const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma);

      return res.status(201).json(novaTurmaCriada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaTurma(req, res) {
    try {
      const { id } = req.params;
      const novaInfo = req.body;
      await turmasServices.atualizaRegistro(novaInfo, id);
      const turmaAtualizada = await turmasServices.pegaUmRegistroPorId(id);

      return res.status(200).json(turmaAtualizada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaTurma(req, res) {
    try {
      const { id } = req.params;
      await turmasServices.apagaRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} destruído com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraTurma(req, res) {
    try {
      const { id } = req.params;
      await turmasServices.restauraRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} restaurado com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = TurmaController;
