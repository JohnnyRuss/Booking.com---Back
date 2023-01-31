const express = require("express");

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  hotelsByPropertyType,
  hotelsByCity,
  exploreCountry,
} = require("../controllers/hotelController.js");

const {
  checkAuth,
  restriction,
} = require("../controllers/authenticationController.js");

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

module.exports = router;
