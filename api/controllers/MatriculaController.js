const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();
const Sequelize = require("sequelize");

class MatriculaController {
  static async pegaTodasAsMatriculas(req, res) {
    try {
      const todasAsMatriculas = await matriculasServices.pegaTodosOsRegistros();

      return res.status(200).json(todasAsMatriculas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaMatriculas(req, res) {
    try {
      const { estudanteId } = req.params;
      const matriculas = await matriculasServices.pegaTodosOsRegistros({
        estudante_id: Number(estudanteId),
      });

      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;

      const todasAsMatriculas = await matriculasServices.pegaUmRegistro({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      return res.status(200).json(todasAsMatriculas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaMatricula(req, res) {
    try {
      const { estudanteId } = req.params;
      const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

      const novaMatriculaCriada = await matriculasServices.criaRegistro(
        novaMatricula
      );

      return res.status(201).json(novaMatriculaCriada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const novaInfo = req.body;

      await matriculasServices.atualizaRegistros(novaInfo, {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      const matriculaAtualizada = await matriculasServices.pegaUmRegistro({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      return res.status(200).json(matriculaAtualizada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;

      await matriculasServices.apagaMatricula({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      return res
        .status(200)
        .json({ message: `Registro ${matriculaId} destruído com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;

      await matriculasServices.restauraMatricula({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      return res
        .status(200)
        .json({ message: `Registro ${matriculaId} restaurado com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    try {
      const { turmaId } = req.params;
      const todasAsMatriculas = await matriculasServices.encontraEContaRegistros(
        { turma_id: Number(turmaId), status: "confirmado" },
        {
          limit: 20,
          order: [["estudante_id", "DESC"]],
        }
      );

      return res.status(200).json(todasAsMatriculas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    try {
      const lotacaoTurma = 2;
      const turmasLotadas = await matriculasServices.encontraEContaRegistros(
        {
          status: "confirmado",
        },
        {
          attributes: ["turma_id"],
          group: ["turma_id"],
          having: Sequelize.literal(`COUNT(turma_id) >= ${lotacaoTurma}`),
        }
      );

      return res.status(200).json(turmasLotadas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = MatriculaController;
