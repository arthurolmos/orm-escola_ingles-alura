"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "John Doe",
          ativo: true,
          email: "john@gmail.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "James Doe",
          ativo: true,
          email: "james@gmail.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Junji Doe",
          ativo: false,
          email: "junji@gmail.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Mario Doe",
          ativo: true,
          email: "mario@gmail.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Carl Doe",
          ativo: true,
          email: "carl@gmail.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Yule Doe",
          ativo: false,
          email: "yule@gmail.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};
