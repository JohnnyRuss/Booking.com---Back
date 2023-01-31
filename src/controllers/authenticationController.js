const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");

const verifyToken = require("../lib/verifyToken");
const asignToken = require("../lib/asignToken");

const User = require("../models/User.js");

exports.register = asyncWrapper(async function (req, res, next) {
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

exports.login = asyncWrapper(async function (req, res, next) {
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

exports.logoutUser = asyncWrapper(async function (req, res, next) {
  res.cookie("authorization", "");
  res.clearCookie("authorization");
  res.end();
});

exports.checkAuth = asyncWrapper(async function (req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.split("Bearer ")[1];

  if (!authorization || !authorization.startsWith("Bearer ") || !token)
    return next(new AppError(403, "you are not authorised"));

  const decodedUser = await verifyToken(token);

  if (!decodedUser) return next(new AppError(403, "you are not authorised"));

  req.user = decodedUser;

  next();
});

exports.restriction = (...roles) =>
  asyncWrapper(async function (req, res, next) {
    const currUser = req.user;
    const userRole = currUser.role;

    if (!roles.includes(userRole))
      return next(new AppError(403, "you are not allowed for this operation"));

    next();
  });

exports.refresh = asyncWrapper(async function (req, res, next) {
  const { authorization } = req.cookies;

  const token = authorization?.split("Bearer ")[1];

  if (!authorization || !authorization.startsWith("Bearer ") || !token)
    return next(new AppError(403, "you are not authorised"));

  const decodedUser = await verifyToken(token, true);
  if (!decodedUser) return next(new AppError(403, "you are not authorized"));

  const { accessToken } = await asignToken(res, decodedUser);

  res.status(200).json({ accessToken });
});
