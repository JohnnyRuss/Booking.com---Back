const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");
const User = require("../models/User.js");

exports.updateUser = asyncWrapper(async function (req, res, next) {
  const body = req.body;
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: body },
    { new: true }
  );

  if (!updatedUser) return next(new AppError(404, "user does not exists"));

  res.status(201).json(updatedUser);
});

exports.deleteUser = asyncWrapper(async function (req, res, next) {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) return next(new AppError(404, "user does not exists"));

  res.status(204).json({ deleted: true });
});

exports.getUser = asyncWrapper(async function (req, res, next) {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) return next(new AppError(404, "user does not exists"));

  res.status(200).json(user);
});

exports.getUsers = asyncWrapper(async function (req, res, next) {
  const users = await User.find();

  res.status(200).json(users);
});
