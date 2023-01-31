import express from "express";

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  hotelsByPropertyType,
  hotelsByCity,
  exploreCountry
} from "../controllers/hotelController.js";

import {
  checkAuth,
  restriction,
} from "../controllers/authenticationController.js";

const router = express.Router();

router
  .route("/")
  .get(getHotels)
  .post(checkAuth, restriction("admin"), createHotel);

router.route("/getByType").get(hotelsByPropertyType);
router.route("/getByCity").get(hotelsByCity);
router.route("/explore").get(exploreCountry);

router
  .route("/:hotelId")
  .put(checkAuth, restriction("admin"), updateHotel)
  .delete(checkAuth, restriction("admin"), deleteHotel)
  .get(getHotel);

export default router;
