async function errorController(err, req, res, next) {
  const NODE_MODE = process.env.NODE_MODE;

  const error = {
    messahe: err.message || "server error",
    status: err.status || "error",
    statusCode: err.statusCode || 500,
  };

  if (NODE_MODE === "DEV") error.stack = err.stack;

  res.status(error.statusCode).json(error);
}

module.exports = errorController;
