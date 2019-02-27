import "./services/env";
import config from "./startup/config";
import db from "./startup/db";

config();
db();

const winston = require("winston");
const express = require("express");

const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/validation")();

const port = process.env.PORT || process.env.EXPRESS_APP_PORT;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
