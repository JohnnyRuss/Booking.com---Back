import JWT from "jsonwebtoken";
import { promisify } from "util";

export default async function verifyToken(token, refresher = false) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

  const validator = promisify(JWT.verify);

  const user = await validator(
    token,
    refresher ? JWT_REFRESH_SECRET : JWT_SECRET
  );

  return user;
}
