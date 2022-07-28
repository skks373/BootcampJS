const requestMiddleware = (req, res, next) => {
  console.log(`GET request made at ${Date.now()}`);
  next();
};

export default requestMiddleware;
