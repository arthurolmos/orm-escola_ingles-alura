const pessoas = require("./pessoasRoutes");
const niveis = require("./niveisRoutes");
const turmas = require("./turmasRoutes");
const matriculas = require("./matriculasRoutes");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("HELLO"));

  app.use(pessoas, niveis, turmas, matriculas);
};
