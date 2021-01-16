const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
      return res.status(200).json(todosOsNiveis);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmNivel(req, res) {
    try {
      const { id } = req.params;

      const umNivel = await niveisServices.pegaUmRegistroPorId(id);

      return res.status(200).json(umNivel);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaNivel(req, res) {
    try {
      const novoNivel = req.body;

      const novoNivelCriado = await niveisServices.criaRegistro(novoNivel);

      return res.status(201).json(novoNivelCriado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaNivel(req, res) {
    try {
      const { id } = req.params;
      const novaInfo = req.body;

      await niveisServices.atualizaRegistro(novaInfo, id);

      const nivelAtualizado = await niveisServices.pegaUmRegistroPorId(id);

      return res.status(200).json(nivelAtualizado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaNivel(req, res) {
    try {
      const { id } = req.params;

      await niveisServices.apagaRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} destruído com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraNivel(req, res) {
    try {
      const { id } = req.params;

      await niveisServices.restauraRegistro(id);

      return res
        .status(200)
        .json({ message: `Registro ${id} restaurado com sucesso!` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = NivelController;
