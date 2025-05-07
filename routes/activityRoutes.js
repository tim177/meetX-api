const express = require("express");
const activityController = require("../controllers/actvityController");

const router = express();

router.get("/", activityController.getAllActivities);

router.post("/create", activityController.createActivity);

module.exports = router;
