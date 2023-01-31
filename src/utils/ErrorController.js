import { config } from "dotenv";

const {
  parsed: { NODE_MODE },
} = config();

export default async function errorController(err, req, res, next) {
  const error = {
    messahe: err.message || "server error",
    status: err.status || "error",
    statusCode: err.statusCode || 500,
  };

  if (NODE_MODE === "DEV") error.stack = err.stack;

  res.status(error.statusCode).json(error);
}
