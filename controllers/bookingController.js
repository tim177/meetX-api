const Activity = require("../models/activityModel");
const Booking = require("../models/bookingModel");

//create the booking
exports.createBooking = async (req, res, next) => {
  try {
    const { activityId } = req.body;

    //check if activity actually exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        status: "fail",
        message: "Activity not found",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      activity: activityId,
    });

    //populate activity detail in response
    await booking.populate("activity");

    res.status(201).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//Get all the bookings for the user
exports.getAllBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "activity"
    );

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
