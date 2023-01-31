import { config } from "dotenv";

const {
  parsed: { NODE_MODE, PORT, DB_APP_CONNECTION_DEV, DB_APP_CONNECTION_PROD },
} = config();

export default function getAppConnection() {
  const config = {
    port: PORT,
  };

  if (NODE_MODE === "DEV") config.link = DB_APP_CONNECTION_DEV;
  else config.link = DB_APP_CONNECTION_PROD;

  return config;
}
