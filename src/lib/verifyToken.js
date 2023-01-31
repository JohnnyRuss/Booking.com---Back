import { config } from "dotenv";
import JWT from "jsonwebtoken";
import { promisify } from "util";

const {
  parsed: { JWT_SECRET, JWT_REFRESH_SECRET, NODE_MODE },
} = config();

export default async function verifyToken(token, refresher = false) {
  const validator = promisify(JWT.verify);

  const user = await validator(
    token,
    refresher ? JWT_REFRESH_SECRET : JWT_SECRET
  );

  return user;
}
