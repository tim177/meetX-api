const express = require("express");
const bookingController = require("../controllers/bookingController");
const userController = require("../controllers/userController");

const router = express();

router.use(userController.protect);

router.post("/", bookingController.createBooking);

router.get("/", bookingController.getAllBooking);

module.exports = router;
