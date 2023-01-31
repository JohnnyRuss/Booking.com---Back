function getAppConnection() {
  const NODE_MODE = process.env.NODE_MODE;
  const PORT = process.env.PORT;
  const CONNECTION_DEV = process.env.DB_APP_CONNECTION_DEV;
  const CONNECTION_PROD = process.env.DB_APP_CONNECTION_PROD;

  const config = {
    port: PORT,
  };

  if (NODE_MODE === "DEV") config.link = CONNECTION_DEV;
  else config.link = CONNECTION_PROD;

  return config;
}

module.exports = getAppConnection;
