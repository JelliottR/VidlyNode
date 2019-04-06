import https from 'https';
import fs from 'fs';
import "./services/env";
import config from "./startup/config";
import db from "./startup/db";

config();
db();

const winston = require("winston");
const express = require("express");


const key = fs.readFileSync(`./certs/selfsigned.key`);
const cert = fs.readFileSync(`./certs/selfsigned.crt`);
const options = {
  key,
  cert
};

const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/validation")();

const server = https.createServer(options, app);

const port = process.env.PORT || process.env.EXPRESS_APP_PORT;
server.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
