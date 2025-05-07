const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to User"],
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: [true, "Booking must belong to an Activity"],
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
