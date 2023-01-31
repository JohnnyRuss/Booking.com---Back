import { config } from "dotenv";

const {
  parsed: { NODE_MODE, APP_ORIGIN_DEV, APP_ORIGIN_PROD },
} = config();

export default function getOrigins() {
  const origins = NODE_MODE === "DEV" ? [APP_ORIGIN_DEV] : [APP_ORIGIN_PROD];
  return origins;
}
