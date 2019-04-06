const winston = require("winston");
const mongoose = require("mongoose");

export default () => {
  const db = process.env.EXPRESS_APP_DB_URL;
  mongoose.connect(db, {useNewUrlParser: true})
  .then(() => winston.info(`Connected to ${db}...`))
  .catch(err => {
      console.log(err.message); 
      process.kill(0)
    }
  );
};