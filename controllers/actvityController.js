const Activity = require("../models/activityModel");

//GET all the activity
exports.getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();

    res.status(200).json({
      status: "success",
      results: activities.length,
      data: {
        activities,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || "Error getting activities",
    });
  }
};

//Creating the activity
exports.createActivity = async (req, res, next) => {
  try {
    const { title, description, location } = req.body;

    const newActivity = await Activity.create({ title, description, location });

    res.status(201).json({
      status: "success",
      data: {
        activity: newActivity,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
