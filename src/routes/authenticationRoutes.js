const express = require("express");

const {
  register,
  login,
  logoutUser,
  refresh,
} = require("../controllers/authenticationController.js");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logoutUser);

router.route("/refresh").post(refresh);

module.exports = router;
