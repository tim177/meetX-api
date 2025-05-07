const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title."],
  },
  description: {
    type: String,
    required: [true, "Please provide the description."],
  },
  location: {
    type: String,
    required: [true, "Please provide the location."],
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
