import express from "express";

import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getHotelRooms,
  reserveRoom,
  insertNewRoom,
} from "../controllers/roomsController.js";

import {
  checkAuth,
  restriction,
} from "../controllers/authenticationController.js";

const router = express.Router();

router
  .route("/:roomId")
  .put(checkAuth, restriction("admin"), updateRoom)
  .get(getRoom);

router.route("/hotel/:hotelId").get(getHotelRooms);

router
  .route("/create/:hotelId")
  .post(checkAuth, restriction("admin"), createRoom);

router
  .route("/insert/:roomId")
  .post(checkAuth, restriction("admin"), insertNewRoom);

router.route("/:roomId/reserve").put(checkAuth, reserveRoom);

router
  .route("/:hotelId/:roomId")
  .delete(checkAuth, restriction("admin"), deleteRoom);

export default router;
