const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;

      const umaPessoa = await pessoasServices.pegaUmRegistroPorId(id);

      return res.status(200).json(umaPessoa);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaPessoaApagada(req, res) {
    try {
      const { id } = req.params;
      const umaPessoa = await pessoasServices.consultaRegistroApagado(id);

      return res.status(200).json(umaPessoa);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaPessoa(req, res) {
    try {
      const novaPessoa = req.body;
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);

      return res.status(201).json(novaPessoaCriada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaPessoa(req, res) {
    try {
      const { id } = req.params;
      const novaInfo = req.body;

      await pessoasServices.atualizaRegistro(novaInfo, id);
      const pessoaAtualizada = await pessoasServices.pegaUmRegistroPorId(id);

      return res.status(200).json(pessoaAtualizada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaPessoa(req, res) {
    try {
      const { id } = req.params;
      await pessoasServices.apagaRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} destruído com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraPessoa(req, res) {
    try {
      const { id } = req.params;
      await pessoasServices.restauraRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} restaurado com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async cancelaPessoa(req, res) {
    try {
      const { estudanteId } = req.params;
      await pessoasServices.cancelaPessoaEMatriculas(estudanteId);

      return res.status(200).json({
        message: `Matricula ref. estudante ${estudanteId} cancelada!`,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = PessoaController;
