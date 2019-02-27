export default () => {
  if (!process.env.EXPRESS_APP_JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
