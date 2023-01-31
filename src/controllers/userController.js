import { AppError, asyncWrapper } from "../utils/index.js";
import User from "../models/User.js";

export const updateUser = asyncWrapper(async function (req, res, next) {
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

export const deleteUser = asyncWrapper(async function (req, res, next) {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) return next(new AppError(404, "user does not exists"));

  res.status(204).json({ deleted: true });
});

export const getUser = asyncWrapper(async function (req, res, next) {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) return next(new AppError(404, "user does not exists"));

  res.status(200).json(user);
});

export const getUsers = asyncWrapper(async function (req, res, next) {
  const users = await User.find();

  res.status(200).json(users);
});
