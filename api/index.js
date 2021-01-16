const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

routes(app);

app.listen(3000, () => console.log("Listening port 3000"));

module.exports = app;
