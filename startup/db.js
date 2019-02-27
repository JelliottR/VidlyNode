const winston = require("winston");
const mongoose = require("mongoose");

export default () => {
  const db = process.env.EXPRESS_APP_DB_URL;
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
