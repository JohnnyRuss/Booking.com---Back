import express from "express";

import {
  register,
  login,
  logoutUser,
  refresh,
} from "../controllers/authenticationController.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logoutUser);

router.route("/refresh").post(refresh);

export default router;
