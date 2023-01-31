function getOrigins() {
  const NODE_MODE = process.env.NODE_MODE;
  const APP_ORIGIN_DEV = process.env.APP_ORIGIN_DEV;
  const APP_ORIGIN_PROD = process.env.APP_ORIGIN_PROD;

  const origins = NODE_MODE === "DEV" ? [APP_ORIGIN_DEV] : [APP_ORIGIN_PROD];
  return origins;
}

module.exports = getOrigins;
