import { AppError, asyncWrapper } from "../utils/index.js";
import User from "../models/User.js";
import { asignToken, verifyToken } from "../lib/index.js";

export const register = asyncWrapper(async function (req, res, next) {
  const { userName, email, password } = req.body;

  const newUser = new User({
    userName,
    email,
    password,
  });

  await newUser.save();

  const { accessToken } = await asignToken(res, newUser);

  newUser.password = undefined;
  newUser.role = undefined;

  res.status(201).json({ user: newUser, accessToken });
});

export const login = asyncWrapper(async function (req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  const validPassword = user.checkPassword(password, user.password);

  if (!user || !validPassword)
    return next(new AppError(403, "incorect emailor password"));

  const { accessToken } = await asignToken(res, user);

  user.password = undefined;
  user.role = undefined;

  res.status(200).json({ user, accessToken });
});

export const logoutUser = asyncWrapper(async function (req, res, next) {
  res.cookie("authorization", "");
  res.clearCookie("authorization");
  res.end();
});

export const checkAuth = asyncWrapper(async function (req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.split("Bearer ")[1];

  if (!authorization || !authorization.startsWith("Bearer ") || !token)
    return next(new AppError(403, "you are not authorised"));

  const decodedUser = await verifyToken(token);

  if (!decodedUser) return next(new AppError(403, "you are not authorised"));

  req.user = decodedUser;

  next();
});

export const restriction = (...roles) =>
  asyncWrapper(async function (req, res, next) {
    const currUser = req.user;
    const userRole = currUser.role;

    if (!roles.includes(userRole))
      return next(new AppError(403, "you are not allowed for this operation"));

    next();
  });

export const refresh = asyncWrapper(async function (req, res, next) {
  const { authorization } = req.cookies;

  const token = authorization?.split("Bearer ")[1];

  if (!authorization || !authorization.startsWith("Bearer ") || !token)
    return next(new AppError(403, "you are not authorised"));

  const decodedUser = await verifyToken(token, true);
  if (!decodedUser) return next(new AppError(403, "you are not authorized"));

  const { accessToken } = await asignToken(res, decodedUser);

  res.status(200).json({ accessToken });
});
