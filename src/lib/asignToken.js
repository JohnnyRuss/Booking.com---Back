import { config } from "dotenv";
import JWT from "jsonwebtoken";
import { getOrigins } from "./index.js";

const {
  parsed: { JWT_SECRET, JWT_REFRESH_SECRET, NODE_MODE },
} = config();

export default async function asignToken(res, user) {
  const payload = {
    id: user._id,
    role: user.role,
    userName: user.userName,
    email: user?.email,
  };

  const accessToken = JWT.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  const cookieOptions = {
    httpOnly: true,
    origin: getOrigins(),
    secure: NODE_MODE === "DEV" ? false : true,
  };

  const refreshToken = JWT.sign(payload, JWT_REFRESH_SECRET);
  res.cookie("authorization", `Bearer ${refreshToken}`, cookieOptions);

  return { accessToken };
}
