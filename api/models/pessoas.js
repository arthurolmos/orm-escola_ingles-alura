"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docente_id" });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        as: "aulasMatriculadas",
        scope: { status: "confirmado" },
      });
    }
  }
  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          funcaoValidadora: function (dado) {
            if (dado.length < 3)
              throw new Error("O campo nome deve ter mais de 3 caracteres!");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Dados do tipo email inválidos!",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoas",
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        todos: {
          where: {},
        },
      },
    }
  );
  return Pessoas;
};
