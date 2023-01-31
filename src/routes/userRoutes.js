import express from "express";

import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";

import {
  checkAuth,
  restriction,
} from "../controllers/authenticationController.js";

const router = express.Router();

router.route("/").get(checkAuth, restriction("admin"), getUsers);

router
  .route("/:userId")
  .put(checkAuth, restriction("admin"), updateUser)
  .delete(checkAuth, restriction("admin"), deleteUser)
  .get(checkAuth, restriction("admin"), getUser);

export default router;
