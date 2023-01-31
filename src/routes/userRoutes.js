const express = require("express");

const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController.js");

const {
  checkAuth,
  restriction,
} = require("../controllers/authenticationController.js");

const router = express.Router();

router.route("/").get(checkAuth, restriction("admin"), getUsers);

router
  .route("/:userId")
  .put(checkAuth, restriction("admin"), updateUser)
  .delete(checkAuth, restriction("admin"), deleteUser)
  .get(checkAuth, restriction("admin"), getUser);

module.exports = router;
