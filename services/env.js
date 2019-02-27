const env = process.env.NODE_ENV;

function load(path) {
  try {
    const result = require("dotenv").config({ path });

    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

switch (env) {
  case "development":
    load(".env.development");
    break;

  case "production":
    load(".env.production");
    break;

  case "test":
    load(".env.test");
    break;

  default:
    console.log("Invalid NODE_ENV value.");
    process.exit(1);
    break;
}
